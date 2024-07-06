import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
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

export const getOrders = createAsyncThunk('feed/getOrders', getOrdersApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelectors(state) {
      return state;
    },
    getOrdersSelectors(state) {
      return state.orders;
    }
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
      .addCase(getFeeds.rejected, (state) => {
        state.isLoading = false;
        // state.error = error.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
        // state.error = error.message;
      });
  }
});
export { initialState as feedInitialState };

export const { getFeedSelectors, getOrdersSelectors } = feedSlice.selectors;

export default feedSlice.reducer;
