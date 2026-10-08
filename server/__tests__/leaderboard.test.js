import { getLeaderboard } from '../src/services/leaderboardService.js';
import Attempt from '../src/models/Attempt.js';
import User from '../src/models/User.js';
import mongoose from 'mongoose';

describe('Leaderboard logic', () => {
  let u1, u2;

  beforeEach(async () => {
    u1 = await User.create({ name: 'U1', email: 'u1@t.com', passwordHash: 'h' });
    u2 = await User.create({ name: 'U2', email: 'u2@t.com', passwordHash: 'h' });
  });

  it('keeps best attempt per user and orders by score then time', async () => {
    const t = new mongoose.Types.ObjectId();
    const now = new Date();
    await Attempt.create({ testId: t, userId: u1._id, score: 5, total: 10, timeTakenSec: 100, submittedAt: now });
    await Attempt.create({ testId: t, userId: u1._id, score: 9, total: 10, timeTakenSec: 200, submittedAt: now });
    await Attempt.create({ testId: t, userId: u2._id, score: 9, total: 10, timeTakenSec: 150, submittedAt: now });

    const result = await getLeaderboard(u1._id, { period: 'all', limit: 10 });
    expect(result.leaderboard.length).toBe(2);
    expect(result.leaderboard[0].name).toBe('U2');
    expect(result.leaderboard[1].name).toBe('U1');
    expect(result.leaderboard[1].score).toBe(9);
  });

  it('filters by weekly', async () => {
    const t = new mongoose.Types.ObjectId();
    const oldDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
    await Attempt.create({ testId: t, userId: u1._id, score: 10, total: 10, timeTakenSec: 100, submittedAt: oldDate });
    const result = await getLeaderboard(u1._id, { period: 'weekly', limit: 10 });
    expect(result.leaderboard.length).toBe(0);
  });
});
