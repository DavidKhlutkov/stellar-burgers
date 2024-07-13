import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { submitOrder, getFeeds } from '@slices';
export const BurgerConstructor = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItemsSelector = useSelector((state) => state.construct);
  const constructorItems = constructorItemsSelector.constructorItems;
  const bun = constructorItems.bun;
  const ingredients = constructorItems.ingredients;
  const orderRequest = constructorItemsSelector.orderRequest;
  const orderModalData = constructorItemsSelector.orderModalData;
  const isAuth = useSelector((state) => state.userInfo.isAuthrized);

  const onOrderClick = () => {
    if (!isAuth && bun) {
      return navigate('/login');
    }
    if (bun && isAuth) {
      const orderId: string[] = [
        bun._id,
        ...ingredients.map((item) => item._id)
      ];
      dispatch(submitOrder(orderId));
    }
  };

  const closeOrderModal = () => {
    dispatch(getFeeds);
  };

  const price = useMemo(
    () =>
      (constructorItems?.bun ? constructorItems?.bun?.price * 2 : 0) +
      constructorItems?.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
