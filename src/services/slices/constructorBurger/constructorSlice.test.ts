import { expect, test, describe } from '@jest/globals';
import constructorReducer, {
  removeIngridient,
  moveDownIngridient,
  moveUpIngridient,
  addIngridient,
  constructorInitialState
} from './constructorSlice';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

const testBun = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};
const testIngredient = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
};

jest.mock('@reduxjs/toolkit', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit');
  return {
    ...originalModule,
    nanoid: jest.fn(() => 'fixed-cart-id')
  };
});

describe('constructor reducer', () => {
  describe('addIngridient', () => {
    test('должен добавлять ингредиент в конструктор', () => {
      const state = constructorReducer(
        constructorInitialState,
        addIngridient({
          ...testIngredient,
          cart_id: 'fixed-cart-id'
        })
      );
      expect(state.constructorItems.ingredients).toEqual([
        {
          ...testIngredient,
          cart_id: 'fixed-cart-id'
        }
      ]);
    });
  });

  describe('removeIngridient', () => {
    test('должен удалять ингредиент из конструктора', () => {
      const state = constructorReducer(
        constructorInitialState,
        removeIngridient(testIngredient)
      );
      expect(state.constructorItems.ingredients).toEqual([]);
    });
  });

  describe('moveUpIngredient', () => {
    test('должен перемещать ингредиент вверх', () => {
      const initialState = {
        ...constructorInitialState,
        constructorItems: {
          ...constructorInitialState.constructorItems,
          ingredients: [testIngredient]
        }
      };
      const state = constructorReducer(
        initialState,
        moveUpIngridient(testIngredient)
      );
      expect(state.constructorItems.ingredients).toEqual([testIngredient]);
    });
  });

  describe('moveDownIngredient', () => {
    test('должен перемещать ингредиент вниз', () => {
      const initialState = {
        ...constructorInitialState,
        constructorItems: {
          ...constructorInitialState.constructorItems,
          ingredients: [testIngredient]
        }
      };
      const state = constructorReducer(
        initialState,
        moveDownIngridient(testIngredient)
      );
      expect(state.constructorItems.ingredients).toEqual([testIngredient]);
    });
  });
});
