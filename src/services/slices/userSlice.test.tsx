import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  userReducer,
  registerFetch,
  login,
  logout,
  updateUser,
  apiGetUser
} from './userSlice';

describe('тесты экшенов редьюсера userSlice', () => {
  const mockUser = {
    user: {
      email: 'kostrovskaya@edu.hse.ru',
      name: 'OstKris'
    }
  };

  const storeError = {
    message: 'error'
  };

  const getNewState = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);
  describe('тесты extraReducers register', () => {
    test('тест экшена начала запроса "pending"', () => {
      const pending = {
        ...initialState,
        error: "",
      };

      const action = {
        type: registerFetch.pending.type,
        payload: mockUser
      };

      expect(getNewState(action)).toStrictEqual(pending);
    });

    test('тест экшена начала запроса "rejected"', () => {
      const rejected = {
        ...initialState,
        error: 'error'
      };

      const action = {
        type: registerFetch.rejected.type,
        error: storeError
      };

      expect(getNewState(action)).toStrictEqual(rejected);
    });

    test('тест экшена начала запроса "fulfilled"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        error: "",
        user: {
          email: 'kostrovskaya@edu.hse.ru',
          name: 'OstKris'
        }
      };

      const action = {
        type: registerFetch.fulfilled.type,
        payload: mockUser
      };

      expect(getNewState(action)).toStrictEqual(fulfilled);
    });
  });

  describe('тесты экшенов редьюсера getApiUser', () => {
    test('тест экшена "rejected"', () => {
      const rejected = {
        ...initialState,
        isAuthChecked: false,
        error: "error",
      };

      const action = {
        type: apiGetUser.rejected.type,
        error: storeError
      };

      expect(getNewState(action)).toStrictEqual(rejected);
    });

    test('тест экшена "fulfilled"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        error: "",
        user: {
          email: 'kostrovskaya@edu.hse.ru',
          name: 'OstKris'
        }
      };

      const action = {
        type: apiGetUser.fulfilled.type,
        payload: mockUser
      };

      expect(getNewState(action)).toStrictEqual(fulfilled);
    });
  });
  describe('тесты extraReducers register', () => {
    test('тест экшена начала запроса "pending"', () => {
      const pending = {
        ...initialState,
        error: "",
      };

      const action = {
        type: login.pending.type,
        payload: mockUser
      };

      expect(getNewState(action)).toStrictEqual(pending);
    });

    test('тест экшена начала запроса "rejected"', () => {
      const rejected = {
        ...initialState,
        error: 'error'
      };

      const action = {
        type: login.rejected.type,
        error: storeError
      };

      expect(getNewState(action)).toStrictEqual(rejected);
    });

    test('тест экшена начала запроса "fulfilled"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        error: "",
        user: { 
          user: {
            email: "kostrovskaya@edu.hse.ru",
            name: "OstKris"
          }  
        },
      };

      const action = {
        type: login.fulfilled.type,
        payload: mockUser
      };

      expect(getNewState(action)).toStrictEqual(fulfilled);
    });
  });
  describe('тесты extraReducers logout', () => {
    test('тест экшена начала запроса "fulfilled"', () => {
      const action = {
        type: logout.fulfilled.type,
        payload: undefined
      };

      expect(getNewState(action)).toStrictEqual(initialState);
    });
  });
  describe('тесты extraReducers updateUser', () => {
    test('тест экшена начала запроса "pending"', () => {
      const pending = {
        ...initialState,
        error: "",
      };

      const action = {
        type: updateUser.pending.type,
        payload: mockUser
      };

      expect(getNewState(action)).toStrictEqual(pending);
    });

    test('тест экшена начала запроса "rejected"', () => {
      const rejected = {
        ...initialState,
        error: 'error'
      };

      const action = {
        type: updateUser.rejected.type,
        error: storeError
      };

      expect(getNewState(action)).toStrictEqual(rejected);
    });

    test('тест экшена начала запроса "fulfilled"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        error: "",
        user: {
          email: 'kostrovskaya@edu.hse.ru',
          name: 'OstKris'
        }
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      };

      expect(getNewState(action)).toStrictEqual(fulfilled);
    });
  });
});