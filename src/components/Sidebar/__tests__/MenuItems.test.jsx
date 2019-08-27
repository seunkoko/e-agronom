// react library
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// components
import MenuItems from '../MenuItems';

describe('MainView component', () => {
  let wrapper;
  const props = {
    id: 1,
    name: 'cat'
  }

  beforeEach(() => {
    wrapper = shallow(
      <MenuItems { ...props } />
    );
  });

  it('renders correctly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
