import { expect, test, describe } from '@jest/globals';
import { initialState, userOrdersSlice, fetchUserOrders } from './userOrdersSlice';

export const ordersReducer = userOrdersSlice.reducer;

describe('проверяют редьюсер слайса ordersSlice', () => {
  const storeOrders = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: '1',
      createdAt: '1',
      updatedAt: '1',
      number: 1
    },
    {
      _id: '2',
      ingredients: ['3', '4'],
      status: 'done',
      name: '2',
      createdAt: '2',
      updatedAt: '2',
      number: 2
    }
  ];

  test('тест экшена успешного запроса "fulfilled"', () => {
    const fulfilled = {
      ...initialState,
      orders: storeOrders
    };

    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: storeOrders
    };
    const newState = ordersReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });
});