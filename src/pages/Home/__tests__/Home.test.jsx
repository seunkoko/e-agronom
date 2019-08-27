// react library
import React from 'react';

// third-party librariess
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import { spy } from 'sinon';
import configureMockStore from 'redux-mock-store';

// components
import ConnectedHome, { Home } from '../Home';
import Sidebar from '../../../components/Sidebar/Sidebar';

const resolvePromise = () => Promise.resolve();

const mockStore = configureMockStore([thunk]);

let store = mockStore({
  categories: {
    data: [],
    error: {},
  },
  categoryImages: {
    data: [],
    error: {},
  },
});

let props = {
  match: {
    params: 1,
  },
}

let mountedWrapper;
let shallowWrapper;

describe('Home Component', () => {

  beforeEach(() => {
    mountedWrapper = mount(
      <Provider store={store}>
        <ConnectedHome
          {...props}
          getCategories={resolvePromise}
          getCategoryImages={resolvePromise}
        />
      </Provider>
    );
  
    shallowWrapper = shallow(
      <Home
        {...props}
        getCategories={resolvePromise}
        getCategoryImages={resolvePromise}
      />
    );
  });

  it('renders correctly', () => {
    const rendering = toJson(mountedWrapper);
    expect(rendering).toMatchSnapshot();
  });

  it('renders correctly when connected to the store', () => {
    expect(mountedWrapper.exists()).toBe(true);
  });

  it('should call handleGetCategoryImages method', () => {
    const handleGetCategoryImagesSpy = spy(shallowWrapper.instance(), 'handleGetCategoryImages');
    shallowWrapper.setState({
      categories: [],
      categoryImages: [],
      currentCategoryId: 1,
      currentPage: 1,
      pending: false,
      loadMorePending: false
    });
    shallowWrapper.instance().handleGetCategoryImages({
      categoryId: 5, page: 1,
    });
    expect(handleGetCategoryImagesSpy.called).toEqual(true);
  });

  it('should call handleLoadMore method', () => {
    shallowWrapper.setProps({ categoryImagesData: {
      data: [{ id: 1 }, { id: 2 }],
      error: {},
    } });

    const handleLoadMoreSpy = spy(shallowWrapper.instance(), 'handleLoadMore');
    shallowWrapper.setState({
      categories: [],
      categoryImages: {
        data: [{ id: 3 }, { id: 4 }],
        error: {},
      },
      currentCategoryId: 1,
      currentPage: 1,
      pending: false,
      loadMorePending: false
    });

    shallowWrapper.instance().handleLoadMore();

    expect(handleLoadMoreSpy.called).toEqual(true);
  });

  it('should simulate openMobileMenu function click event', () => {
    const openMobileMenuSpy = spy(shallowWrapper.instance(), 'openMobileMenu');

    const wrapper =  mount(
        <Sidebar
          categories={[]}
          openMobileMenu={openMobileMenuSpy}
        />, { attachTo: document.body }
    );

    const openMobileMenu = wrapper.find('#open-sidebar-icon');
    openMobileMenu.simulate('click');
    expect(wrapper.find('#sidebar-id').hasClass('mobile-style')).toEqual(false)
    expect(openMobileMenuSpy.called).toEqual(true);
  });
});
