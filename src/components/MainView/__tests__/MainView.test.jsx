// react library
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// components
import MainView from '../MainView';

describe('MainView component', () => {
  let wrapper;
  let props = {
    pending: false,
    categoryImages: [],
    handleLoadMore: jest.fn(),
    loadMorePending: false,
  }

  beforeEach(() => {
    wrapper = shallow(
      <MainView { ...props } />
    );
  });

  it('renders correctly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when pending is true', () => {
    props = {
      ...props,
      pending: true,
    }

    wrapper = shallow(
      <MainView { ...props } />
    );
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly when category images are provided', () => {
    props = {
      ...props,
      pending: false,
      categoryImages: [
        {
          url: 'fake-url1'
        },
        {
          url: 'fake-url2'
        }
      ],
    }

    wrapper = shallow(
      <MainView { ...props } />
    );
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly when loadMorePending is true', () => {
    props = {
      ...props,
      loadMorePending: true,
    }

    wrapper = shallow(
      <MainView { ...props } />
    );
    expect(wrapper).toBeTruthy();
  });
});
