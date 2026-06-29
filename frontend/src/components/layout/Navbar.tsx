import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900">
            ShopSphere
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link to="/search" className="text-sm text-gray-600 hover:text-gray-900">
              Search
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">

            {/* Cart with live count badge */}
            <Link to="/cart" className="relative text-sm text-gray-600 hover:text-gray-900">
              Cart
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-4 bg-black text-white text-xs
                                 w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="text-sm text-gray-600 hover:text-gray-900">
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;