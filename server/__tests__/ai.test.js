
import Question from '../src/models/Question.js';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';

jest.unstable_mockModule('@google/genai', () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: jest.fn().mockResolvedValue({
          text: JSON.stringify([
            { text: "MockQ", options: ["A","B","C","D"], correctIndex: 0, explanation: "Mock" }
          ])
        })
      }
    }))
  };
});

// We must dynamically import the services after the mock
let validateQ;
let generateQ;
let Topic;

beforeAll(async () => {
  const qv = await import('../src/services/questionValidator.js');
  validateQ = qv.validateQuestion;
  const as = await import('../src/services/aiService.js');
  generateQ = as.generateQuestions;
  const t = await import('../src/models/Topic.js');
  Topic = t.default;
});

describe('AI generation and validator', () => {
  it('rejects malformed questions in validator', async () => {
    const badQ = { text: "Hi", options: ["A", "B", "A", "D"], correctIndex: 0, explanation: "E" };
    const res = await validateQ(badQ, new mongoose.Types.ObjectId());
    expect(res.isValid).toBe(false);
  });

  it('rejects duplicate question', async () => {
    const tId = new mongoose.Types.ObjectId();
    await Question.create({ topicId: tId, text: "Some question text", options: ["A","B","C","D"], correctIndex: 0, difficulty: "easy", source: "manual" });
    
    const dup = { text: " some question TEXT!!!", options: ["1","2","3","4"], correctIndex: 1, explanation: "E" };
    const res = await validateQ(dup, tId);
    expect(res.isValid).toBe(false);
  });

  it('mock Gemini calls work and never call real API', async () => {
    const t = await Topic.create({ name: 'T', slug: 't', category: 'quant' });
    const result = await generateQ({ topicId: t._id.toString(), subtopic: 's', difficulty: 'easy', count: 1, verify: false });
    expect(result.savedDrafts.length).toBe(1);
    expect(result.savedDrafts[0].text).toBe('MockQ');
  });
});
