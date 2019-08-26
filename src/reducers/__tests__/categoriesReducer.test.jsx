// types
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from '../../actions/types';

// reducers
import { categories } from '../categoriesReducer';

const oldState = {
  data: {},
  error: {},
};

describe('Categories Reducer', () => {
  it('should return the default state if an action is not provided', () => {
    expect(categories(oldState, {})).toEqual(oldState);
  });

  it('should set error if GET_CATEGORIES_FAILURE is called', () => {
    const action = {
      data: {},
      error: { message: "something went wrong" },
    };

    const newState = categories(oldState, {
      error: { message: "something went wrong" },
      type: GET_CATEGORIES_FAILURE,
    });

    expect(newState).toEqual(action);
  });

  it('should set data if GET_CATEGORIES_SUCCESS is called', () => {
    const action = {
      data: [{id: 1}],
      error: {},
    };

    const newState = categories(oldState, {
      data: [{id: 1}],
      type: GET_CATEGORIES_SUCCESS,
    });

    expect(newState).toEqual(action);
  });
});
