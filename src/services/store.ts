import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingridientSlice/ingridientsSlice';
import constructorReducer from './slices/constructorSlice/constructorSlice';
import feedReducer from './slices/feedSlice/feedSlice';
import userInfoReducer from './slices/userInfoSlice/userInfoSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  construct: constructorReducer,
  userInfo: userInfoReducer,
  feed: feedReducer
}); // подключаем слайсы

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
