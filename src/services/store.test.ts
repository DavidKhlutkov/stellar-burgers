import { combineReducers } from '@reduxjs/toolkit';
import ingridientsSliceReducer from '../services/slices/ingridientSlice/ingridientsSlice';
import userInfoSliceReducer from '../services/slices/userInfoSlice/userInfoSlice';
import constructorSliceReducer from '../services/slices/constructorSlice/constructorSlice';
import feedSliceReducer from '../services/slices/feedSlice/feedSlice';

describe('test store', () => {
  test('test store', () => {
    const store = combineReducers({
      ingredients: ingridientsSliceReducer,
      userInfo: userInfoSliceReducer,
      construct: constructorSliceReducer,
      feed: feedSliceReducer
    });

    const initialState = store(undefined, { type: '' });
    expect(initialState).toEqual({
      ingredients: ingridientsSliceReducer(undefined, { type: '' }),
      userInfo: userInfoSliceReducer(undefined, { type: '' }),
      construct: constructorSliceReducer(undefined, { type: '' }),
      feed: feedSliceReducer(undefined, { type: '' })
    });
  });
});
