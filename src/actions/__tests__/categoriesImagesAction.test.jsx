// third-party imports
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { stub } from 'sinon';
import axios from 'axios';

// actions
import {
  getCategoryImages,
  getCategoryImagesSuccess,
  getCategoryImagesFailure,
} from '../../actions/categoryImagesAction';

// action types
import {
  GET_CATEGORY_IMAGES_SUCCESS,
  GET_CATEGORY_IMAGES_FAILURE,
} from '../../actions/types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const url = '`https://api.thecatapi.com/v1/images/search?order=desc&limit=10&category_ids=5&page=1`'
let store;


describe('Category Images Actions', () => {

  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => moxios.uninstall());

  it('should dispatch category images success action to store if request is successful', () => {
    const expectedAction = {
      type: GET_CATEGORY_IMAGES_SUCCESS
    };
    expect(getCategoryImagesSuccess()).toEqual(expectedAction);
  });

  it('should dispatch category images action to store if request is unsuccessful', () => {
    const expectedAction = {
      type: GET_CATEGORY_IMAGES_FAILURE
    };
    expect(getCategoryImagesFailure()).toEqual(expectedAction);
  });

  it('dispatches GET_CATEGORIES_SUCCESS when categories are successfully fetched', (done) => {
    const response = [{ data: {} }];
    moxios.stubRequest(`${url}`, {
      status: 200,
      response,
    });

    const resolved = new Promise(dispatch => dispatch(response));
    const expectedActions = [
      {
        type: GET_CATEGORY_IMAGES_SUCCESS,
      },
    ];

    stub(axios, 'get').callsFake(() => resolved);
    store.dispatch(getCategoryImages())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      })
      .then(done, done);
    done();
  });
});
