import request from 'supertest';
import app from '../src/app.js';
import Question from '../src/models/Question.js';
import Topic from '../src/models/Topic.js';
import User from '../src/models/User.js';
import { generateToken } from '../src/utils/generateToken.js';

describe('Practice Endpoints', () => {
  let token;
  let qId;
  let topicId;

  beforeEach(async () => {
    const student = await User.create({ name: 'S', email: 's@t.com', passwordHash: 'h', role: 'student' });
    token = generateToken(student._id, student.role);
    const topic = await Topic.create({ name: 'T', slug: 't', category: 'quant' });
    topicId = topic._id;
    const q = await Question.create({
      topicId, text: 'Q1', options: ['A','B','C','D'], correctIndex: 1, explanation: 'Exp', difficulty: 'easy', source: 'manual', status: 'approved'
    });
    qId = q._id;
  });

  it('hides correctIndex and explanation in list', async () => {
    const res = await request(app).get(`/api/practice/${topicId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].correctIndex).toBeUndefined();
    expect(res.body.data[0].explanation).toBeUndefined();
  });

  it('check endpoint returns correctIndex and explanation', async () => {
    const res = await request(app).post(`/api/practice/check`).set('Authorization', `Bearer ${token}`).send({
      questionId: qId.toString(), selectedIndex: 1
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.isCorrect).toBe(true);
    expect(res.body.data.correctIndex).toBe(1);
    expect(res.body.data.explanation).toBe('Exp');
  });
});
