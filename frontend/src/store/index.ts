import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

// These two types are used everywhere in the app
// RootState lets you type useSelector correctly
// AppDispatch lets you type useDispatch correctly
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;