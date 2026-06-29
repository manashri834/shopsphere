import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../../components/layout/Navbar';
import cartReducer from '../../store/slices/cartSlice';
import authReducer from '../../store/slices/authSlice';

// Helper — builds a real Redux store with custom initial state
const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
    preloadedState,
  });

// Helper — wraps component with everything it needs
const renderNavbar = (preloadedState = {}) => {
  const store = makeStore(preloadedState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
};

describe('Navbar', () => {

  it('renders the ShopSphere logo', () => {
    renderNavbar();
    expect(screen.getByText('ShopSphere')).toBeInTheDocument();
  });

  it('renders the Products link', () => {
    renderNavbar();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('shows Login button when user is not authenticated', () => {
    renderNavbar();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows cart with no badge when cart is empty', () => {
    renderNavbar();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    // Badge should not appear when totalQuantity is 0
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows cart badge count when items are in the cart', () => {
    renderNavbar({
      cart: { items: [], totalQuantity: 3, totalPrice: 89.97 },
    });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows username and Logout when user is authenticated', () => {
    renderNavbar({
      auth: {
        user: { _id: '1', name: 'Manashri', email: 'test@test.com', isAdmin: false },
        accessToken: 'token-abc',
        isAuthenticated: true,
        loading: false,
        error: null,
      },
    });
    expect(screen.getByText('Manashri')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

});