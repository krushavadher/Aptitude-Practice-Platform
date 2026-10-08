import { submitTest } from '../src/services/testService.js';
import Test from '../src/models/Test.js';
import User from '../src/models/User.js';
import Question from '../src/models/Question.js';
import mongoose from 'mongoose';

describe('testService scoring logic', () => {
  let userId, testId, q1, q2;

  beforeEach(async () => {
    const u = await User.create({ name: 'U', email: 'u@t.com', passwordHash: 'h' });
    userId = u._id;

    q1 = await Question.create({ topicId: new mongoose.Types.ObjectId(), text: 'Q1', options: ['A','B','C','D'], correctIndex: 0, difficulty: 'easy', source: 'manual' });
    q2 = await Question.create({ topicId: new mongoose.Types.ObjectId(), text: 'Q2', options: ['A','B','C','D'], correctIndex: 1, difficulty: 'easy', source: 'manual' });

    const t = await Test.create({
      userId,
      questionIds: [q1._id, q2._id],
      durationSec: 1000,
      startedAt: new Date(),
      expiresAt: new Date(Date.now() + 100000)
    });
    testId = t._id;
  });

  it('handles no answers (score 0)', async () => {
    const res = await submitTest(testId, userId, { answers: [] });
    expect(res.attempt.score).toBe(0);
    expect(res.attempt.total).toBe(2);
  });

  it('ignores duplicate answers (only counts first)', async () => {
    const res = await submitTest(testId, userId, { answers: [
      { questionId: q1._id.toString(), selectedIndex: 0, timeSpentSec: 5 },
      { questionId: q1._id.toString(), selectedIndex: 1, timeSpentSec: 5 }
    ]});
    expect(res.attempt.score).toBe(1);
    expect(res.attempt.answers.length).toBe(1);
  });

  it('ignores foreign question ids', async () => {
    const foreignId = new mongoose.Types.ObjectId().toString();
    const res = await submitTest(testId, userId, { answers: [
      { questionId: q1._id.toString(), selectedIndex: 0, timeSpentSec: 5 },
      { questionId: foreignId, selectedIndex: 1, timeSpentSec: 5 }
    ]});
    expect(res.attempt.score).toBe(1);
    expect(res.attempt.answers.length).toBe(1);
  });
});
