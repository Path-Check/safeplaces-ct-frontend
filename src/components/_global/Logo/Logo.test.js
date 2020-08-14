import React from 'react';
import { shallow } from 'enzyme';
import Logo from './index';
import { Link } from 'react-router-dom';

describe('Logo', () => {
  it('should render', async () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find(Link).length).toBe(1);
  });
});
