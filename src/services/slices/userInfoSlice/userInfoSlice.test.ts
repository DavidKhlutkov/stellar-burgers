import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  getUser,
  updateUser,
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  clearError,
  initialUserInfoState
} from './userInfoSlice';
import * as api from '@api';

// Mock API functions
jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
  resetPasswordApi: jest.fn()
}));

const createTestStore = () =>
  configureStore({
    reducer: { user: userReducer }
  });

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: any) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('userInfoSlice', () => {
  const testPendingState = (actionType: string) => {
    const action = { type: actionType };
    const state = userReducer(initialUserInfoState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  };

  const testFulfilledState = (actionType: string, payload: any) => {
    const action = {
      type: actionType,
      payload
    };
    const state = userReducer(initialUserInfoState, action);
    if (payload.user) {
      expect(state.user).toEqual(payload.user);
    }
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  };

  const testRejectedState = (actionType: string) => {
    const action = {
      type: actionType,
      error: { message: 'Error occurred' }
    };
    const state = userReducer(initialUserInfoState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error occurred');
  };

  describe('getUser', () => {
    test('should handle pending state', () => {
      testPendingState(getUser.pending.type);
    });

    test('should handle fulfilled state', () => {
      testFulfilledState(getUser.fulfilled.type, { user: 'test' });
    });

    test('should handle rejected state', () => {
      testRejectedState(getUser.rejected.type);
    });
  });

  describe('updateUser', () => {
    test('should handle pending state', () => {
      testPendingState(updateUser.pending.type);
    });

    test('should handle fulfilled state', () => {
      testFulfilledState(updateUser.fulfilled.type, { user: 'test' });
    });

    test('should handle rejected state', () => {
      testRejectedState(updateUser.rejected.type);
    });
  });

  describe('registerUser', () => {
    test('should handle pending state', () => {
      testPendingState(registerUser.pending.type);
    });

    test('should handle fulfilled state', () => {
      testFulfilledState(registerUser.fulfilled.type, { user: 'test' });
    });

    test('should handle rejected state', () => {
      testRejectedState(registerUser.rejected.type);
    });
  });

  describe('loginUser', () => {
    test('should handle pending state', () => {
      testPendingState(loginUser.pending.type);
    });

    test('should handle fulfilled state', () => {
      testFulfilledState(loginUser.fulfilled.type, {
        user: 'test',
        accessToken: 'test',
        refreshToken: 'test'
      });
    });

    test('should handle rejected state', () => {
      testRejectedState(loginUser.rejected.type);
    });
  });

  describe('logout', () => {
    test('should handle pending state', () => {
      testPendingState(logout.pending.type);
    });

    test('should handle fulfilled state', () => {
      const action = { type: logout.fulfilled.type };
      const state = userReducer(initialUserInfoState, action);
      expect(state.user).toBe(null);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.isAuthrized).toBe(false);
    });

    test('should handle rejected state', () => {
      testRejectedState(logout.rejected.type);
    });
  });

  describe('forgotPassword', () => {
    test('should handle pending state', () => {
      testPendingState(forgotPassword.pending.type);
    });

    test('should handle fulfilled state', () => {
      const action = { type: forgotPassword.fulfilled.type };
      const state = userReducer(initialUserInfoState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    test('should handle rejected state', () => {
      testRejectedState(forgotPassword.rejected.type);
    });
  });

  describe('resetPassword', () => {
    test('should handle pending state', () => {
      testPendingState(resetPassword.pending.type);
    });

    test('should handle fulfilled state', () => {
      const action = { type: resetPassword.fulfilled.type };
      const state = userReducer(initialUserInfoState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    test('should handle rejected state', () => {
      testRejectedState(resetPassword.rejected.type);
    });
  });

  describe('clearError', () => {
    test('should clear error', () => {
      const action = { type: clearError.type };
      const state = userReducer(initialUserInfoState, action);
      expect(state.error).toBe(null);
    });
  });
});
