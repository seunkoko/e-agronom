// actions
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from './types';

import axios from 'axios';

/**
 * getCategoriesSuccess - Dispatch
 *
 * @param {array} data - data contains data to dispatch
 * @returns {object} - an object containing the type and payload
 */
export const getCategoriesSuccess = data => (
  {
    type: GET_CATEGORIES_SUCCESS,
    data,
  }
);

/**
 * getCategoriesFailure - Dispatch error message on failure to get categories
 *
 * @param {object} error - error contains error message, status and code
 * @returns {object} - an object containing the type and payload
 */
export const getCategoriesFailure = error => (
  {
    type: GET_CATEGORIES_FAILURE,
    error,
  }
);


/**
 * getCategories - Dispatch categories after successfully fetching them
 *
 * @param {function} dispatch - dispatch method
 * @returns {function} - disapatch method depending on axios response
 */
export const getCategories = () => (dispatch) => {
  return axios.get("https://api.thecatapi.com/v1/categories")
    .then(response => dispatch(getCategoriesSuccess(response.data)))
    .catch(error => dispatch(getCategoriesFailure(error)));
};
