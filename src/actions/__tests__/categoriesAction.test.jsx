// third-party imports
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { stub } from 'sinon';
import axios from 'axios';

// actions
import {
  getCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
} from '../../actions/categoriesAction';

// action types
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from '../../actions/types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const url = "https://api.thecatapi.com/v1/categories";
let store;


describe('Categories Actions', () => {

  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => moxios.uninstall());

  it('should dispatch categories success action to store if request is successful', () => {
    const expectedAction = {
      type: GET_CATEGORIES_SUCCESS
    };
    expect(getCategoriesSuccess()).toEqual(expectedAction);
  });

  it('should dispatch categories failure action to store if request is unsuccessful', () => {
    const expectedAction = {
      type: GET_CATEGORIES_FAILURE
    };
    expect(getCategoriesFailure()).toEqual(expectedAction);
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
        type: GET_CATEGORIES_SUCCESS,
      },
    ];

    stub(axios, 'get').callsFake(() => resolved);
    store.dispatch(getCategories())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      })
      .then(done, done);
    done();
  });
});
