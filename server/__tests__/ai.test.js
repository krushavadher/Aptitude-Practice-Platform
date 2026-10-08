
import { jest } from '@jest/globals';
import request from 'supertest';
import { createAdminToken, createStudentToken, seedTopicWithQuestions } from './setup.js';

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
let Question;
let app;
let mongoose;

beforeAll(async () => {
  const m = await import('mongoose');
  mongoose = m.default;
  const q = await import('../src/models/Question.js');
  Question = q.default;
  const qv = await import('../src/services/questionValidator.js');
  validateQ = qv.validateQuestion;
  const as = await import('../src/services/aiService.js');
  generateQ = as.generateQuestions;
  const t = await import('../src/models/Topic.js');
  Topic = t.default;
  const appModule = await import('../src/app.js');
  app = appModule.default;
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

  it('mock Gemini calls work and save as draft with source ai', async () => {
    const t = await Topic.create({ name: 'T', slug: 't', category: 'quant' });
    const result = await generateQ({ topicId: t._id.toString(), subtopic: 's', difficulty: 'easy', count: 1, verify: false });
    expect(result.savedDrafts.length).toBe(1);
    expect(result.savedDrafts[0].text).toBe('MockQ');
    expect(result.savedDrafts[0].status).toBe('draft');
    expect(result.savedDrafts[0].source).toBe('ai');
    expect(result.rejected.length).toBe(0);
  });

  it('rejects out-of-range correctIndex', async () => {
    const badQ = { text: "Hi", options: ["A", "B", "C", "D"], correctIndex: 5, explanation: "E" };
    const res = await validateQ(badQ, new mongoose.Types.ObjectId());
    expect(res.isValid).toBe(false);
  });

  describe('Admin review API endpoints', () => {
    it('allows admin to approve a draft', async () => {
      const adminToken = await createAdminToken();
      const topicId = await seedTopicWithQuestions(1);
      
      const q = await Question.create({ topicId, text: "Draft Q", options: ["1","2","3","4"], correctIndex: 0, explanation: "E", difficulty: "easy", status: "draft", source: "ai" });
      
      const res = await request(app)
        .patch(`/api/admin/questions/${q._id}/review`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ action: 'approve' });
      
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('approved');
    });

    it('prevents students from reviewing', async () => {
      const studentToken = await createStudentToken();
      const q = await Question.create({ topicId: new mongoose.Types.ObjectId(), text: "Draft Q", options: ["1","2","3","4"], correctIndex: 0, explanation: "E", difficulty: "easy", status: "draft", source: "ai" });
      
      const res = await request(app)
        .patch(`/api/admin/questions/${q._id}/review`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ action: 'approve' });
      
      expect(res.status).toBe(403);
    });
    
    it('drafts and rejected questions do not appear in practice', async () => {
      const studentToken = await createStudentToken();
      const topicId = await seedTopicWithQuestions(1); // 1 approved manual question
      
      await Question.create({ topicId, text: "Draft Q", options: ["1","2","3","4"], correctIndex: 0, explanation: "E", difficulty: "easy", status: "draft", source: "ai" });
      await Question.create({ topicId, text: "Rejected Q", options: ["1","2","3","4"], correctIndex: 0, explanation: "E", difficulty: "easy", status: "rejected", source: "ai" });
      
      const res = await request(app)
        .get(`/api/practice/${topicId}?limit=10`)
        .set('Authorization', `Bearer ${studentToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1); // Only the 1 approved question
      expect(res.body.data[0].text).not.toBe('Draft Q');
      expect(res.body.data[0].text).not.toBe('Rejected Q');
    });
  });
});
