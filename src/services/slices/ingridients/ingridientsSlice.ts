import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IIngridientsState {
  ingredient: TIngredient;
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IIngridientsState = {
  ingredient: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelectors(state) {
      return state.ingredients;
    },
    getStateSelectors(state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
      state.error = null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  }
});
export { initialState as ingredientsInitialState };

export const {} = ingredientsSlice.actions;

export const { getIngredientsSelectors, getStateSelectors } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
