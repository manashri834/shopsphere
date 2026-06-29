import request from 'supertest';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes';
import { errorHandler, notFound } from '../middleware/errorMiddleware';

dotenv.config();

// Build a minimal express app just for testing
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use(notFound);
app.use(errorHandler);

// Connect to a test database before all tests
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI as string);
  }
});

// Clean up users after each test so tests don't interfere
afterEach(async () => {
  await mongoose.connection.collection('users').deleteMany({});
});

// Disconnect after all tests are done
afterAll(async () => {
  await mongoose.connection.collection('users').deleteMany({});
  await mongoose.connection.close();
});

describe('POST /api/auth/register', () => {

  it('registers a new user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'test@test.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user.email).toBe('test@test.com');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('returns 400 if email already exists', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'dupe@test.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User 2', email: 'dupe@test.com', password: 'password456' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it('returns 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'missing@test.com' }); // no name or password

    expect(res.status).toBe(400);
  });

});

describe('POST /api/auth/login', () => {

  beforeEach(async () => {
    // Register a user to login with
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Login User', email: 'login@test.com', password: 'password123' });
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user.email).toBe('login@test.com');
  });

  it('returns 401 with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@test.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);
  });

  it('returns 401 with non-existent email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@test.com', password: 'password123' });

    expect(res.status).toBe(401);
  });

});

describe('POST /api/auth/logout', () => {

  it('logs out successfully', async () => {
    const res = await request(app)
      .post('/api/auth/logout');

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/logged out/i);
  });

});