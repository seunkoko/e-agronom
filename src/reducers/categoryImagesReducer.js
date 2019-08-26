// actions
import {
  GET_CATEGORY_IMAGES_FAILURE,
  GET_CATEGORY_IMAGES_SUCCESS,
} from '../actions/types';

// reducers
import initialState from './initialState';

/**
 * Category Images reducer
 *
 * @export
 * @param   {object} state  - initial state
 * @param   {object} action - action
 * @returns {object}        - reduced or initial state
 */
export const categoryImages = (state = initialState.categoryImages, action) => {
  switch (action.type) {
    case GET_CATEGORY_IMAGES_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    case GET_CATEGORY_IMAGES_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
