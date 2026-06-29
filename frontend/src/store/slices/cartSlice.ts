import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartState,  Product } from '../../types';

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Helper — recalculates totals from the items array
// Called after every change so totals are always accurate
const recalculateTotals = (state: CartState) => {
  state.totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity, 0
  );
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // Add a product to cart, or increase its quantity if already there
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.product._id === action.payload._id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      recalculateTotals(state);
    },

    // Remove a product from cart entirely
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
      recalculateTotals(state);
    },

    // Set a specific quantity for a cart item
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.items.find(
        (item) => item.product._id === action.payload.productId
      );
      if (item) {
        // If quantity is 0 or less, remove the item
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.product._id !== action.payload.productId
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      recalculateTotals(state);
    },

    // Wipe the entire cart — used after successful checkout
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;