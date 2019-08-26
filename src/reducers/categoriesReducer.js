// actions
import {
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
} from '../actions/types';

// reducers
import initialState from './initialState';

/**
 * Categories reducer
 *
 * @export
 * @param   {object} state  - initial state
 * @param   {object} action - action
 * @returns {object}        - reduced or initial state
 */
export const categories = (state = initialState.categories, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.data,
        pending: action.pending,
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: action.pending,
      };

    default:
      return state;
  }
};
