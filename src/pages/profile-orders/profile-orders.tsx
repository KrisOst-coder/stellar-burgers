import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  getOrdersSelector
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  });

  return <ProfileOrdersUI orders={orders} />;
};
