import Question from '../models/Question.js';

const normalizeText = (text) => {
  return text.toLowerCase().trim().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
};

export const validateQuestion = async (q, topicId) => {
  try {
    if (!q.text || typeof q.text !== 'string' || q.text.length > 2000) return { isValid: false, reason: 'Text is invalid or too long' };
    if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.length > 2000) return { isValid: false, reason: 'Explanation is invalid or too long' };
    if (!Array.isArray(q.options) || q.options.length !== 4) return { isValid: false, reason: 'Must have exactly 4 options' };
    const uniqueOptions = new Set(q.options.filter(o => typeof o === 'string' && o.trim() !== ''));
    if (uniqueOptions.size !== 4) return { isValid: false, reason: 'Options must be unique and non-empty' };
    if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) return { isValid: false, reason: 'Invalid correctIndex' };

    const normNewText = normalizeText(q.text);

    const existingQuestions = await Question.find({ topicId }).select('text');
    for (const ex of existingQuestions) {
      const normExText = normalizeText(ex.text);
      if (normExText === normNewText) {
        return { isValid: false, reason: 'Duplicate question detected' };
      }
    }

    return { isValid: true };
  } catch (err) {
    return { isValid: false, reason: err.message };
  }
};
