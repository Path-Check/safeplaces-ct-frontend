import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('Header', () => {
  it('loads when the user is authenticated and onboarded', async () => {
    const wrapper = shallow(
      <Header isAuthenticated={true} isOnboarded={true} />,
    );
    expect(wrapper.find('header').length).toBe(1);
  });

  it('does not load when the user is either not authenticated or not onboarded', async () => {
    const wrapper = shallow(
      <Header isAuthenticated={false} isOnboarded={false} />,
    );
    expect(wrapper.find('header').length).toBe(0);
  });
});
