import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';

type TBurgerState = {

    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];

};

export const initialState: TBurgerState = {
    bun: null,
    ingredients: []
};

const burgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurger: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload });
      }
    },
    removeBurger: (state, action) => {
      const { id } = action.payload;
      state.ingredients.splice(id, 1);
    },
    handleBurgerPosition: (state, action) => {
      const { id, step } = action.payload;
      [
        state.ingredients[id],
        state.ingredients[id + step]
      ] = [
        state.ingredients[id + step],
        state.ingredients[id]
      ];
    },
    clearBurger: (state) => (state = initialState)
  }
});

export const burgerReducer = burgerSlice.reducer;

export const { addBurger, removeBurger, clearBurger, handleBurgerPosition } =
  burgerSlice.actions;