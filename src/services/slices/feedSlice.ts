import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { error } from 'console';

export interface IFeedState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
}

const initialState: IFeedState = {
  orders: [],
  isLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const getFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);

export const getOrdersNumber = createAsyncThunk(
  'feed/getOrders',
  getOrderByNumberApi
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelectors: (state) => state,
    getOrdersSelectors: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrdersNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.error = null;
      })
      .addCase(getOrdersNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});
export { initialState as feedInitialState };

export const { getFeedSelectors, getOrdersSelectors } = feedSlice.selectors;

export default feedSlice.reducer;
