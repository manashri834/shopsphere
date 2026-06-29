import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../store/slices/cartSlice';
import type { CartState } from '../../types';
import type { Product } from '../../types';

// A fake product to use across all cart tests
const mockProduct: Product = {
  _id: 'prod-001',
  name: 'Test Headphones',
  description: 'Great sound',
  price: 79.99,
  image: 'headphones.jpg',
  category: 'Electronics',
  stock: 10,
  rating: 4.5,
  numReviews: 20,
};

const mockProduct2: Product = {
  _id: 'prod-002',
  name: 'Test Shoes',
  description: 'Comfy shoes',
  price: 119.99,
  image: 'shoes.jpg',
  category: 'Footwear',
  stock: 5,
  rating: 4.7,
  numReviews: 8,
};

const emptyState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

describe('cartSlice', () => {

  // --- addToCart ---
  describe('addToCart', () => {
    it('adds a new product to an empty cart', () => {
      const state = cartReducer(emptyState, addToCart(mockProduct));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product._id).toBe('prod-001');
      expect(state.items[0].quantity).toBe(1);
    });

    it('increments quantity when same product added twice', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(state, addToCart(mockProduct));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });

    it('adds a second product as a separate cart item', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(state, addToCart(mockProduct2));
      expect(state.items).toHaveLength(2);
    });

    it('updates totalQuantity correctly after adding', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(state, addToCart(mockProduct));
      expect(state.totalQuantity).toBe(2);
    });

    it('updates totalPrice correctly after adding', () => {
      const state = cartReducer(emptyState, addToCart(mockProduct));
      expect(state.totalPrice).toBeCloseTo(79.99);
    });
  });

  // --- removeFromCart ---
  describe('removeFromCart', () => {
    it('removes a product from the cart by id', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(state, removeFromCart('prod-001'));
      expect(state.items).toHaveLength(0);
    });

    it('does nothing if product id does not exist', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(state, removeFromCart('does-not-exist'));
      expect(state.items).toHaveLength(1);
    });

    it('recalculates totals after removal', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(state, addToCart(mockProduct2));
      state = cartReducer(state, removeFromCart('prod-001'));
      expect(state.totalQuantity).toBe(1);
      expect(state.totalPrice).toBeCloseTo(119.99);
    });
  });

  // --- updateQuantity ---
  describe('updateQuantity', () => {
    it('sets the quantity of a cart item', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(
        state,
        updateQuantity({ productId: 'prod-001', quantity: 5 })
      );
      expect(state.items[0].quantity).toBe(5);
    });

    it('removes the item when quantity set to 0', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(
        state,
        updateQuantity({ productId: 'prod-001', quantity: 0 })
      );
      expect(state.items).toHaveLength(0);
    });

    it('removes the item when quantity set to negative', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(
        state,
        updateQuantity({ productId: 'prod-001', quantity: -1 })
      );
      expect(state.items).toHaveLength(0);
    });

    it('recalculates totalPrice after quantity update', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(
        state,
        updateQuantity({ productId: 'prod-001', quantity: 3 })
      );
      expect(state.totalPrice).toBeCloseTo(79.99 * 3);
    });
  });

  // --- clearCart ---
  describe('clearCart', () => {
    it('empties the cart completely', () => {
      let state = cartReducer(emptyState, addToCart(mockProduct));
      state = cartReducer(state, addToCart(mockProduct2));
      state = cartReducer(state, clearCart());
      expect(state.items).toHaveLength(0);
      expect(state.totalQuantity).toBe(0);
      expect(state.totalPrice).toBe(0);
    });

    it('clearing an already empty cart does not crash', () => {
      const state = cartReducer(emptyState, clearCart());
      expect(state.items).toHaveLength(0);
    });
  });

});