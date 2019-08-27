// react library
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { spy } from 'sinon';

// components
import Sidebar from '../Sidebar';

describe('MainView component', () => {
  let wrapper;
  let props = {
    openMobileMenu: jest.fn(),
    categories: [],
  }

  beforeEach(() => {
    wrapper = shallow(
      <Sidebar { ...props } />
    );
  });

  it('renders correctly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when categories are provided', () => {
    props = {
      ...props,
      categories: [
        {
          id: '1',
          name: 'category1'
        },
        {
          id: '2',
          name: 'category2'
        },
      ],
    }

    wrapper = shallow(
      <Sidebar { ...props } />
    );
    expect(wrapper).toBeTruthy();
  });
});
