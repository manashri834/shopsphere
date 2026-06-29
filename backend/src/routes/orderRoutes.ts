import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  markOrderPaid,
  getAllOrders,
} from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createOrder);
router.get('/mine', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, markOrderPaid);

export default router;