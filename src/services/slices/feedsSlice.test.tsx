import { expect, test, describe } from '@jest/globals';
import {
    ordersSelector, 
    totalOrdersSelector, 
    totalTodayOrdersSelector,
    feedsReducer,
    initialState,
    fetchAllFeeds
} from './feedsSlice';

describe('проверяют редьюсер слайса feedsSlice', () => {
    const storeFeeds = {
        orders: [
          {
            _id: '1',
            ingredients: [
              '1',
              '2',
              '1'
            ],
            status: 'done',
            name: '1',
            createdAt: '1',
            updatedAt: '1',
            number: 1
          },
          {
            _id: '2',
            ingredients: [
              '1',
              '2',
              '3',
              '1'
            ],
            status: 'done',
            name: '2',
            createdAt: '2',
            updatedAt: '2',
            number: 2
          }
        ],
        total: 2,
        totalToday: 2
      };
  
  test('тест экшена начала запроса "pending"', () => {
    const pending = {
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
      loading: true,
      error: undefined,
    };

    const action = {
      type: fetchAllFeeds.pending.type,
        payload: storeFeeds
    };

    const newState = feedsReducer(initialState, action);

    expect(newState).toStrictEqual(pending);
  });

  test('тест экшена ошибки запроса "fulfilled"', () => {

    const fulfilled = {
      ...initialState,
      orders: storeFeeds.orders,
      total: storeFeeds.total,
      totalToday: storeFeeds.totalToday,
      loading: false,
      error: null
    };

    const action = {
        type: fetchAllFeeds.fulfilled.type,
        payload: storeFeeds
    };

    const newState = feedsReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });

  test('тест экшена ошибки запроса "rejected"', () => {
    const mockError = {
      message: 'error'
    };

    const rejected = {
      loading: false,
      error: undefined,
      orders: [],
      total: 0,
      totalToday: 0,
    };

    const action = {
        type: fetchAllFeeds.rejected.type,
        payload: storeFeeds
    };

    const newState = feedsReducer(initialState, action);

    expect(newState).toStrictEqual(rejected);
  });

});