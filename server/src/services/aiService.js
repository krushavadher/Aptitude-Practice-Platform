import { GoogleGenAI } from '@google/genai'; // nodemon restart trigger
import { getGenerationPrompt, getVerificationPrompt } from '../prompts/questionGeneration.js';
import { validateQuestion } from './questionValidator.js';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';

let aiClient = null;
const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
};

const parseJson = (text) => {
  try {
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.substring(7);
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.substring(3);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.substring(0, cleanText.length - 3);
    }
    return JSON.parse(cleanText.trim());
  } catch (err) {
    throw new Error('Failed to parse AI output as JSON');
  }
};

export const generateQuestions = async (data) => {
  const { topicId, subtopic, difficulty, count, verify } = data;
  const topic = await Topic.findById(topicId);
  if (!topic) throw new Error('Topic not found');

  const ai = getAiClient();
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  const prompt = getGenerationPrompt(topic.name, subtopic, difficulty, count);

  let generatedData = null;
  let attempts = 0;
  let lastError = null;

  while (attempts < 3 && !generatedData) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt
      });
      generatedData = parseJson(response.text);
      if (!Array.isArray(generatedData)) throw new Error('Output is not an array');
    } catch (err) {
      lastError = err;
      if (err.message.includes('quota') || err.message.includes('API key')) {
        throw new Error(`AI API Error: ${err.message}`);
      }
    }
  }

  if (!generatedData) {
    throw new Error(`Failed to generate valid questions after 3 attempts. Last error: ${lastError?.message}`);
  }

  const savedDrafts = [];
  const rejected = [];

  for (const q of generatedData) {
    const validation = await validateQuestion(q, topicId);
    if (!validation.isValid) {
      rejected.push({ question: q, reason: validation.reason });
      continue;
    }

    let flagged = false;
    let aiVerified = false;

    if (verify) {
      try {
        const verifyPrompt = getVerificationPrompt(q.text, q.options);
        const vResponse = await ai.models.generateContent({
          model: modelName,
          contents: verifyPrompt
        });
        const vResult = parseJson(vResponse.text);
        if (vResult.correctIndex !== q.correctIndex) {
          flagged = true;
        } else {
          aiVerified = true;
        }
      } catch (err) {
        flagged = true;
      }
    }

    try {
      const saved = await Question.create({
        topicId,
        subtopic,
        text: q.text,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        difficulty,
        source: 'ai',
        status: 'draft',
        flagged,
        aiVerified
      });
      savedDrafts.push(saved);
    } catch (err) {
      rejected.push({ question: q, reason: 'Database save error: ' + err.message });
    }
  }

  return { savedDrafts, rejected };
};
