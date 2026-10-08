import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';

describe('Auth Endpoints', () => {
  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test', email: 'test@example.com', password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.token).toBeDefined();
  });

  it('rejects duplicate email', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Test', email: 'test@example.com', password: 'password123'
    });
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test2', email: 'test@example.com', password: 'password123'
    });
    expect(res.statusCode).toBe(400);
  });

  it('logs in successfully and fails with wrong pass', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Test', email: 'test@example.com', password: 'password123'
    });
    const successRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com', password: 'password123'
    });
    expect(successRes.statusCode).toBe(200);
    expect(successRes.body.data.token).toBeDefined();

    const failRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com', password: 'wrong'
    });
    expect(failRes.statusCode).toBe(401);
  });

  it('fetches /me with token and fails without', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'Test', email: 'test@example.com', password: 'password123'
    });
    const token = reg.body.data.token;

    const meRes = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(meRes.statusCode).toBe(200);
    expect(meRes.body.data.email).toBe('test@example.com');

    const failRes = await request(app).get('/api/auth/me');
    expect(failRes.statusCode).toBe(401);
  });
});
