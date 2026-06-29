import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalPrice } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add some products to get started.</p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Your Cart ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-500 hover:text-red-700 underline"
        >
          Clear cart
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
          >
            {/* Product image */}
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-lg bg-gray-100"
            />

            {/* Product info */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">${item.product.price.toFixed(2)}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(updateQuantity({
                    productId: item.product._id,
                    quantity: item.quantity - 1,
                  }))
                }
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center
                           justify-center text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(updateQuantity({
                    productId: item.product._id,
                    quantity: item.quantity + 1,
                  }))
                }
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center
                           justify-center text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <p className="w-20 text-right font-medium text-gray-900">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>

            {/* Remove button */}
            <button
              onClick={() => dispatch(removeFromCart(item.product._id))}
              className="text-gray-400 hover:text-red-500 text-lg ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="bg-gray-50 rounded-xl p-6 max-w-sm ml-auto">
        <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Subtotal ({totalQuantity} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-4 w-full bg-black text-white py-3 rounded-lg text-center
                     block hover:bg-gray-800 font-medium"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;