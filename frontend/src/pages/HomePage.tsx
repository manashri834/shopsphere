import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import type { Product } from '../types';

// Fake product just to test the cart works before the backend is ready
const fakeProduct: Product = {
  _id: 'test-001',
  name: 'Test Product',
  description: 'A test product to verify Redux is working.',
  price: 29.99,
  image: 'https://placehold.co/400x400?text=Product',
  category: 'Test',
  stock: 10,
  rating: 4.5,
  numReviews: 12,
};

const HomePage = () => {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to ShopSphere</h1>
      <p className="mt-3 text-gray-500 text-lg">Your one-stop shop for everything.</p>

      <div className="mt-10 p-6 border border-gray-200 rounded-xl max-w-sm">
        <p className="text-sm text-gray-500 mb-1">Redux test — cart has:</p>
        <p className="text-2xl font-bold text-gray-900 mb-4">{totalQuantity} items</p>
        <button
          onClick={() => dispatch(addToCart(fakeProduct))}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Add test product to cart
        </button>
      </div>
    </div>
  );
};

export default HomePage;