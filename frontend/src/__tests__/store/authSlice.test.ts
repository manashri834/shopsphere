import authReducer, {
  setCredentials,
  clearError,
} from '../../store/slices/authSlice';
import type { AuthState } from '../../types';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const mockUser = {
  _id: 'user-001',
  name: 'Test User',
  email: 'test@example.com',
  isAdmin: false,
};

describe('authSlice', () => {

  it('returns the initial state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  describe('setCredentials', () => {
    it('sets user and accessToken and marks authenticated', () => {
      const state = authReducer(
        initialState,
        setCredentials({ user: mockUser, accessToken: 'token-abc' })
      );
      expect(state.user).toEqual(mockUser);
      expect(state.accessToken).toBe('token-abc');
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('clearError', () => {
    it('clears the error field', () => {
      const stateWithError: AuthState = { ...initialState, error: 'Login failed' };
      const state = authReducer(stateWithError, clearError());
      expect(state.error).toBeNull();
    });

    it('does nothing if there is no error', () => {
      const state = authReducer(initialState, clearError());
      expect(state.error).toBeNull();
    });
  });

});