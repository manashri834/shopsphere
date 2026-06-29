import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CartPage from '../../pages/CartPage';
import cartReducer from '../../store/slices/cartSlice';
import authReducer from '../../store/slices/authSlice';
import type { Product } from '../../types';

interface CartItemInput {
  product: Product;
  quantity: number;
}

const mockProduct: Product = {
  _id: 'prod-001',
  name: 'Wireless Headphones',
  description: 'Great sound',
  price: 79.99,
  image: 'headphones.jpg',
  category: 'Electronics',
  stock: 10,
  rating: 4.5,
  numReviews: 20,
};

const makeStore = (cartItems: CartItemInput[] = []) =>
  configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
    preloadedState: {
      cart: {
        items: cartItems,
        totalQuantity: cartItems.reduce((s, i) => s + i.quantity, 0),
        totalPrice: cartItems.reduce(
          (s, i) => s + i.product.price * i.quantity,
          0
        ),
      },
    },
  });

const renderCart = (cartItems: CartItemInput[] = []) => {
  const store = makeStore(cartItems);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    </Provider>
  );
};

describe('CartPage', () => {

  it('shows empty state when cart has no items', () => {
    renderCart([]);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Browse Products')).toBeInTheDocument();
  });

  it('shows product name when item is in cart', () => {
    renderCart([{ product: mockProduct, quantity: 1 }]);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
  });

  it('shows correct item count in heading', () => {
  renderCart([{ product: mockProduct, quantity: 2 }]);
  // Use heading role to be specific — the count appears in the h1 heading
  expect(screen.getByRole('heading', { name: /2 items/i })).toBeInTheDocument();
});

 it('shows the product price', () => {
  renderCart([{ product: mockProduct, quantity: 1 }]);
  // getAllByText because price appears in both unit price and line total
  const priceElements = screen.getAllByText('$79.99');
  expect(priceElements.length).toBeGreaterThan(0);
});

  it('shows Order Summary section', () => {
    renderCart([{ product: mockProduct, quantity: 1 }]);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('shows Proceed to Checkout button', () => {
    renderCart([{ product: mockProduct, quantity: 1 }]);
    expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
  });

  it('shows Clear cart button when items exist', () => {
    renderCart([{ product: mockProduct, quantity: 1 }]);
    expect(screen.getByText('Clear cart')).toBeInTheDocument();
  });

});