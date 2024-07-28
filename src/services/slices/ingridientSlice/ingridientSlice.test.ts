import reducer, {
  getIngredients,
  ingredientsInitialState
} from './ingridientsSlice';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientsSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      ingredientsInitialState
    );
  });

  it('should handle getIngredients/pending', () => {
    const action = { type: getIngredients.pending.type };
    const expectedState = {
      ...ingredientsInitialState,
      isLoading: true,
      error: null
    };
    const nextState = reducer(ingredientsInitialState, action);
    expect(nextState).toEqual(expectedState);
  });

  it('should handle getIngredients/fulfilled', () => {
    const ingredientsMock = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'type1',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: ''
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'type2',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredientsMock
    };
    const expectedState = {
      ...ingredientsInitialState,
      ingredients: ingredientsMock,
      isLoading: false,
      error: null
    };
    const nextState = reducer(ingredientsInitialState, action);
    expect(nextState).toEqual(expectedState);
  });

  it('should handle getIngredients/rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const expectedState = {
      ...ingredientsInitialState,
      isLoading: false,
      error: errorMessage
    };
    const nextState = reducer(ingredientsInitialState, action);
    expect(nextState).toEqual(expectedState);
  });
});
