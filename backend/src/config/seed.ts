import dotenv from 'dotenv';
import connectDB from './db';
import Product from '../models/productModel';

dotenv.config();

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30hr battery.',
    price: 79.99,
    image: 'https://placehold.co/400x400?text=Headphones',
    category: 'Electronics',
    stock: 25,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning.',
    price: 119.99,
    image: 'https://placehold.co/400x400?text=Shoes',
    category: 'Footwear',
    stock: 40,
    rating: 4.7,
    numReviews: 8,
  },
  {
    name: 'Leather Backpack',
    description: 'Genuine leather backpack with laptop compartment.',
    price: 149.99,
    image: 'https://placehold.co/400x400?text=Backpack',
    category: 'Bags',
    stock: 15,
    rating: 4.3,
    numReviews: 5,
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS.',
    price: 199.99,
    image: 'https://placehold.co/400x400?text=Watch',
    category: 'Electronics',
    stock: 20,
    rating: 4.6,
    numReviews: 19,
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Premium 100% organic cotton t-shirt, available in 6 colours.',
    price: 29.99,
    image: 'https://placehold.co/400x400?text=T-Shirt',
    category: 'Clothing',
    stock: 100,
    rating: 4.2,
    numReviews: 31,
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with thermal carafe.',
    price: 89.99,
    image: 'https://placehold.co/400x400?text=Coffee',
    category: 'Kitchen',
    stock: 18,
    rating: 4.4,
    numReviews: 7,
  },
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('✓ Database seeded with 6 products');
  process.exit();
};

seed();