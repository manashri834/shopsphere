import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from '../routes/productRoutes';
import authRoutes from '../routes/authRoutes';
import { errorHandler, notFound } from '../middleware/errorMiddleware';
import Product from '../models/productModel';

dotenv.config();

// Increase Jest timeout to 30s for all tests in this file
// MongoDB Atlas connections over the internet need more than the default 5s
jest.setTimeout(30000);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use(notFound);
app.use(errorHandler);

const sampleProduct = {
  name: 'Test Headphones',
  description: 'Great sound quality',
  price: 79.99,
  image: 'https://placehold.co/400x400',
  category: 'Electronics',
  stock: 25,
};

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI as string);
  }
  // Clean up any products left over from previous test runs or seed data
  await Product.deleteMany({});
});

afterEach(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await Product.deleteMany({});
  await mongoose.connection.close();
});

describe('GET /api/products', () => {

  it('returns empty array when no products exist', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all products', async () => {
    await Product.create(sampleProduct);
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Test Headphones');
  });

  it('filters products by keyword', async () => {
    await Product.create(sampleProduct);
    await Product.create({ ...sampleProduct, name: 'Running Shoes', category: 'Footwear' });
    const res = await request(app).get('/api/products?keyword=headphones');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Test Headphones');
  });

  it('filters products by category', async () => {
    await Product.create(sampleProduct);
    await Product.create({ ...sampleProduct, name: 'Running Shoes', category: 'Footwear' });
    const res = await request(app).get('/api/products?category=Footwear');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].category).toBe('Footwear');
  });

});

describe('GET /api/products/:id', () => {

  it('returns a single product by id', async () => {
    const product = await Product.create(sampleProduct);
    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test Headphones');
  });

  it('returns 404 for non-existent product id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/products/${fakeId}`);
    expect(res.status).toBe(404);
  });

});