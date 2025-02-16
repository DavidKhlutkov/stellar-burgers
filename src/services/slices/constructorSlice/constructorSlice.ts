import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';

export interface IConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  isLoading: false
};

export const submitOrder = createAsyncThunk(
  'constructor/submitOrder',
  (ingredients: string[]) => orderBurgerApi(ingredients)
);

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    removeIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.cart_id !== action.payload.cart_id
        );
    },
    moveDownIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currentIndex < state.constructorItems.ingredients.length - 1) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex + 1];
        state.constructorItems.ingredients[currentIndex + 1] = action.payload;
      }
    },
    moveUpIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currentIndex > 0) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex - 1];
        state.constructorItems.ingredients[currentIndex - 1] = action.payload;
      }
    },
    addIngridient: {
      reducer: (
        state,
        action: PayloadAction<TConstructorIngredient & { cart_id: string }>
      ) => {
        const data = action.payload;
        if (data.type === 'bun') {
          state.constructorItems.bun = data;
          return;
        }
        state.constructorItems.ingredients.push(data);
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const cart_id = nanoid();
        return { payload: { ...ingredient, cart_id } };
      }
    }
  },
  selectors: {
    getConstructorSelectors: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(submitOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(submitOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    });
  }
});
export { initialState as constructorInitialState };

export const {
  removeIngridient,
  moveDownIngridient,
  moveUpIngridient,
  addIngridient
} = constructorSlice.actions;

export const { getConstructorSelectors } = constructorSlice.selectors;

export default constructorSlice.reducer;
