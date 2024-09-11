import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  handleBurgerPosition,
  removeBurger
} from '../../services/slices/burgerSlices';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(handleBurgerPosition({ id: index, step: 1 }));
    };

    const handleMoveUp = () => {
      dispatch(handleBurgerPosition({ id: index, step: -1 }));
    };

    const handleClose = () => {
      dispatch(removeBurger({ id: index }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);