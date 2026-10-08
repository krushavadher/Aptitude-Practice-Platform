import request from 'supertest';
import app from '../src/app.js';
import Question from '../src/models/Question.js';
import Topic from '../src/models/Topic.js';
import User from '../src/models/User.js';
import Test from '../src/models/Test.js';
import { generateToken } from '../src/utils/generateToken.js';

describe('Timed Tests Endpoints', () => {
  let token1, token2, user1, qId, topicId;

  beforeEach(async () => {
    user1 = await User.create({ name: 'S1', email: 's1@t.com', passwordHash: 'h', role: 'student' });
    const user2 = await User.create({ name: 'S2', email: 's2@t.com', passwordHash: 'h', role: 'student' });
    token1 = generateToken(user1._id, user1.role);
    token2 = generateToken(user2._id, user2.role);
    const topic = await Topic.create({ name: 'T', slug: 't', category: 'quant' });
    topicId = topic._id;
    const q = await Question.create({
      topicId, text: 'Q1', options: ['A','B','C','D'], correctIndex: 1, explanation: 'Exp', difficulty: 'easy', source: 'manual', status: 'approved'
    });
    qId = q._id;
  });

  it('starts test and returns no answers', async () => {
    const res = await request(app).post('/api/tests/start').set('Authorization', `Bearer ${token1}`).send({
      topicId: topicId.toString(), numQuestions: 1, durationSec: 300
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.testId).toBeDefined();
    expect(res.body.data.questions[0].correctIndex).toBeUndefined();
  });

  it('submits correctly and scores', async () => {
    const startRes = await request(app).post('/api/tests/start').set('Authorization', `Bearer ${token1}`).send({
      numQuestions: 1, durationSec: 300
    });
    const testId = startRes.body.data.testId;

    const subRes = await request(app).post(`/api/tests/${testId}/submit`).set('Authorization', `Bearer ${token1}`).send({
      answers: [{ questionId: qId.toString(), selectedIndex: 1, timeSpentSec: 10 }]
    });
    expect(subRes.statusCode).toBe(200);
    expect(subRes.body.data.attempt.score).toBe(1);
  });

  it('rejects double submit', async () => {
    const startRes = await request(app).post('/api/tests/start').set('Authorization', `Bearer ${token1}`).send({
      numQuestions: 1, durationSec: 300
    });
    const testId = startRes.body.data.testId;

    await request(app).post(`/api/tests/${testId}/submit`).set('Authorization', `Bearer ${token1}`).send({ answers: [] });
    const doubleRes = await request(app).post(`/api/tests/${testId}/submit`).set('Authorization', `Bearer ${token1}`).send({ answers: [] });
    expect(doubleRes.statusCode).toBe(400);
  });

  it('marks as expired after duration + grace', async () => {
    const startRes = await request(app).post('/api/tests/start').set('Authorization', `Bearer ${token1}`).send({
      numQuestions: 1, durationSec: 300
    });
    const testId = startRes.body.data.testId;

    const testDoc = await Test.findById(testId);
    testDoc.expiresAt = new Date(Date.now() - 11000);
    await testDoc.save();

    const subRes = await request(app).post(`/api/tests/${testId}/submit`).set('Authorization', `Bearer ${token1}`).send({ answers: [] });
    expect(subRes.statusCode).toBe(200);
    expect(subRes.body.data.status).toBe('expired');
  });

  it('rejects other user submitting or reading', async () => {
    const startRes = await request(app).post('/api/tests/start').set('Authorization', `Bearer ${token1}`).send({
      numQuestions: 1, durationSec: 300
    });
    const testId = startRes.body.data.testId;

    const subRes = await request(app).post(`/api/tests/${testId}/submit`).set('Authorization', `Bearer ${token2}`).send({ answers: [] });
    expect(subRes.statusCode).toBe(403);
    
    await request(app).post(`/api/tests/${testId}/submit`).set('Authorization', `Bearer ${token1}`).send({ answers: [] });
    const readRes = await request(app).get(`/api/tests/${testId}/result`).set('Authorization', `Bearer ${token2}`);
    expect(readRes.statusCode).toBe(403);
  });
});
