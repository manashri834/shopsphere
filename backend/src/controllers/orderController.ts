import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/orderModel';
import type { AuthRequest } from '../middleware/authMiddleware';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// POST /api/orders — create order + Stripe payment intent together
export const createOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    // Create Stripe payment intent first
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // Stripe uses cents
      currency: 'usd',
      metadata: { userId: req.user!._id.toString() },
    });

    // Create the order in MongoDB
    const order = await Order.create({
      user: req.user!._id,
      orderItems,
      shippingAddress,
      totalPrice,
      stripePaymentIntentId: paymentIntent.id,
    });

    res.status(201).json({
      order,
      clientSecret: paymentIntent.client_secret, // sent to frontend for Stripe.js
    });
  }
);

// GET /api/orders/mine — logged in user's orders
export const getMyOrders = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const orders = await Order.find({ user: req.user!._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  }
);

// GET /api/orders/:id
export const getOrderById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    // Only the owner or an admin can view the order
    if (
      order.user._id.toString() !== req.user!._id.toString() &&
      !req.user!.isAdmin
    ) {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
    res.json(order);
  }
);

// PUT /api/orders/:id/pay — mark order as paid after Stripe confirms
export const markOrderPaid = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    order.isPaid = true;
    order.paidAt = new Date();
    const updated = await order.save();
    res.json(updated);
  }
);

// GET /api/orders — admin: all orders
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find().populate('user', 'name email').sort({
      createdAt: -1,
    });
    res.json(orders);
  }
);