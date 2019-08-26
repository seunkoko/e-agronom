import {
  GET_CATEGORY_IMAGES_SUCCESS,
  GET_CATEGORY_IMAGES_FAILURE,
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
    error,
  }
);


/**
 * getCategoryImages - Dispatch category images after successfully fetching them
 *
 * @param {function} dispatch - dispatch method
 * @returns {function} - disapatch method depending on axios response
 */
export const getCategoryImages = (limit=10, categoryId=1, page=1) => (dispatch) => {
  return axios.get(`https://api.thecatapi.com/v1/images/search?order=${'DESC'}&limit=${limit}&category_ids=${categoryId}&page=${page}`)
    .then(response => dispatch(getCategoryImagesSuccess(response.data)))
    .catch(error => dispatch(getCategoryImagesFailure(error)));
};
