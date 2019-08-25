import {
  GET_CATEGORY_IMAGES_SUCCESS,
  GET_CATEGORY_IMAGES_FAILURE,
  GET_CATEGORY_IMAGES_PENDING,
} from './types';

import axios from 'axios';

/**
 * getCategoryImagesSuccess - Dispatch
 *
 * @param {array} data - data contains data to dispatch
 * @returns {object} - an object containing the type and payload
 */
export const getCategoryImagesSuccess = data => (
  {
    type: GET_CATEGORY_IMAGES_SUCCESS,
    pending: false,
    data,
  }
);

/**
 * getCategoryImagesFailure - Dispatch error message on failure to get category images
 *
 * @param {object} error - error contains error message, status and code
 * @returns {object} - an object containing the type and payload
 */
export const getCategoryImagesFailure = error => (
  {
    type: GET_CATEGORY_IMAGES_FAILURE,
    pending: false,
    error,
  }
);

/**
 * getCategoryImagesPending - Dispatch status for getCategoryImages action
 *
 * @returns {object} - an object containing the type and payload
 */
export const getCategoryImagesPending = () => (
  {
    type: GET_CATEGORY_IMAGES_PENDING,
    pending: true,
  }
);

/**
 * getCategoryImages - Dispatch category images after successfully fetching them
 *
 * @param {function} dispatch - dispatch method
 * @returns {function} - disapatch method depending on axios response
 */
export const getCategoryImages = (limit=10, categoryId=1, page=1) => (dispatch) => {
  dispatch(getCategoryImagesPending());
  return axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&category_ids=${categoryId}&page=${page}`)
    .then(response => dispatch(getCategoryImagesSuccess(response.data)))
    .catch(error => dispatch(getCategoryImagesFailure(error)));
};
