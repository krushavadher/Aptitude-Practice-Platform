import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import { generateToken } from '../src/utils/generateToken.js';

describe('Role Guard', () => {
  it('returns 403 for a student accessing admin routes', async () => {
    const student = await User.create({ name: 'S', email: 's@t.com', passwordHash: 'h', role: 'student' });
    const token = generateToken(student._id, student.role);

    const endpoints = [
      { method: 'get', path: '/api/admin/questions' },
      { method: 'post', path: '/api/admin/topics' },
      { method: 'get', path: '/api/admin/stats' }
    ];

    for (const ep of endpoints) {
      const res = await request(app)[ep.method](ep.path).set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(403);
    }
  });
});
