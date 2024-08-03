import reducer, {
    feedInitialState as initialState,
    getFeeds,
    getOrdersNumber
  } from './feedSlice';
  import { TOrder } from '@utils-types';
  
  describe('feedSlice', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        ingredients: ['1', '2', '3'],
        status: 'done',
        number: 1,
        name: 'test',
        createdAt: 'test',
        updatedAt: 'test'
      }
    ];
    const mockApiResponse = {
      orders: mockOrders,
      total: 5,
      totalToday: 2
    };
  
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    describe('getFeeds', () => {
      it('should handle pending state', () => {
        const action = { type: getFeeds.pending.type };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBe(null);
      });
  
      it('should handle fulfilled state', () => {
        const action = {
          type: getFeeds.fulfilled.type,
          payload: mockApiResponse
        };
        const state = reducer(initialState, action);
        expect(state.orders).toEqual(mockOrders);
        expect(state.total).toBe(mockApiResponse.total);
        expect(state.totalToday).toBe(mockApiResponse.totalToday);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
      });
  
      it('should handle rejected state', () => {
        const action = {
          type: getFeeds.rejected.type,
          error: { message: 'Error occurred' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Error occurred');
      });
    });
  
    describe('getOrdersNumber', () => {
      it('should handle pending state', () => {
        const action = { type: getOrdersNumber.pending.type };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBe(null);
      });
  
      it('should handle fulfilled state', () => {
        const action = {
          type: getOrdersNumber.fulfilled.type,
          payload: { orders: mockOrders }
        };
        const state = reducer(initialState, action);
        expect(state.orders).toEqual(mockOrders);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
      });
  
      it('should handle rejected state', () => {
        const action = {
          type: getOrdersNumber.rejected.type,
          error: { message: 'Error occurred' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Error occurred');
      });
    });
  });