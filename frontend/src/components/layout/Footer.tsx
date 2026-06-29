import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-bold text-gray-900 mb-3">ShopSphere</h3>
            <p className="text-sm text-gray-500">
              Your one-stop shop for everything you need.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/products" className="hover:text-gray-900">All Products</Link></li>
              <li><Link to="/search" className="hover:text-gray-900">Search</Link></li>
              <li><Link to="/cart" className="hover:text-gray-900">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/login" className="hover:text-gray-900">Login</Link></li>
              <li><Link to="/register" className="hover:text-gray-900">Register</Link></li>
              <li><Link to="/orders" className="hover:text-gray-900">My Orders</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;