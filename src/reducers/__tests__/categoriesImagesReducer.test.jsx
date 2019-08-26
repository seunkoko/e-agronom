// types
import {
  GET_CATEGORY_IMAGES_SUCCESS,
  GET_CATEGORY_IMAGES_FAILURE,
} from '../../actions/types';

// reducers
import { categoryImages } from '../categoryImagesReducer';

const oldState = {
  data: {},
  error: {},
};

describe('Categories Reducer', () => {
  it('should return the default state if an action is not provided', () => {
    expect(categoryImages(oldState, {})).toEqual(oldState);
  });

  it('should set error if GET_CATEGORIES_FAILURE is called', () => {
    const action = {
      data: {},
      error: { message: "something went wrong" },
    };

    const newState = categoryImages(oldState, {
      error: { message: "something went wrong" },
      type: GET_CATEGORY_IMAGES_FAILURE,
    });

    expect(newState).toEqual(action);
  });

  it('should set data if GET_CATEGORIES_SUCCESS is called', () => {
    const action = {
      data: [{id: 1}],
      error: {},
    };

    const newState = categoryImages(oldState, {
      data: [{id: 1}],
      type: GET_CATEGORY_IMAGES_SUCCESS,
    });

    expect(newState).toEqual(action);
  });
});
