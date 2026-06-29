import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

// GET /api/products — supports ?keyword= and ?category=
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const keywordStr = typeof req.query.keyword === 'string' ? req.query.keyword : '';
  const categoryStr = typeof req.query.category === 'string' ? req.query.category : '';

  const filter: Record<string, unknown> = {};

  if (keywordStr) {
    filter.name = { $regex: keywordStr, $options: 'i' };
  }
  if (categoryStr) {
    filter.category = categoryStr;
  }

  const products = await Product.find(filter);
  res.json(products);
});

// GET /api/products/:id
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  }
);

// POST /api/products — admin only
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, image, category, stock } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
    });
    res.status(201).json(product);
  }
);

// PUT /api/products/:id — admin only
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    const { name, description, price, image, category, stock } = req.body;
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.image = image ?? product.image;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;
    const updated = await product.save();
    res.json(updated);
  }
);

// DELETE /api/products/:id — admin only
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  }
);