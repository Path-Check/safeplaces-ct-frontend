import React from 'react';
import { shallow } from 'enzyme';
import Logo from './index';
import { Link } from 'react-router-dom';

describe('Logo', () => {
  it('should render', async () => {
    // Shallow mount a component (child components are not rendered)
    const wrapper = shallow(<Logo />);

    // Assert 1 or more conditions
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
