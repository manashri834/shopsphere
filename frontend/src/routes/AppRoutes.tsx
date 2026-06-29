import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const HomePage            = lazy(() => import('../pages/HomePage'));
const ProductListPage     = lazy(() => import('../pages/ProductListPage'));
const ProductDetailPage   = lazy(() => import('../pages/ProductDetailPage'));
const CartPage            = lazy(() => import('../pages/CartPage'));
const CheckoutPage        = lazy(() => import('../pages/CheckoutPage'));
const LoginPage           = lazy(() => import('../pages/LoginPage'));
const RegisterPage        = lazy(() => import('../pages/RegisterPage'));
const ProfilePage         = lazy(() => import('../pages/ProfilePage'));
const OrdersPage          = lazy(() => import('../pages/OrdersPage'));
const OrderDetailPage     = lazy(() => import('../pages/OrderDetailPage'));
const WishlistPage        = lazy(() => import('../pages/WishlistPage'));
const SearchPage          = lazy(() => import('../pages/SearchPage'));
const AdminDashboardPage  = lazy(() => import('../pages/AdminDashboardPage'));
const AdminProductsPage   = lazy(() => import('../pages/AdminProductsPage'));
const NotFoundPage        = lazy(() => import('../pages/NotFoundPage'));

const AppRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      }>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"             element={<HomePage />} />
            <Route path="/products"     element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart"         element={<CartPage />} />
            <Route path="/login"        element={<LoginPage />} />
            <Route path="/register"     element={<RegisterPage />} />
            <Route path="/search"       element={<SearchPage />} />
            <Route path="*"             element={<NotFoundPage />} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route element={<Layout />}>
              <Route path="/checkout"       element={<CheckoutPage />} />
              <Route path="/profile"        element={<ProfilePage />} />
              <Route path="/orders"         element={<OrdersPage />} />
              <Route path="/orders/:id"     element={<OrderDetailPage />} />
              <Route path="/wishlist"       element={<WishlistPage />} />
              <Route path="/admin"          element={<AdminDashboardPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;