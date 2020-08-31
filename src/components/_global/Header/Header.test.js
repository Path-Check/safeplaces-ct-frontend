import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('Header', () => {
  it('loads when the user is authenticated and onboarded', async () => {
    // Shallow mount the component with props (child components are not rendered)
    const wrapper = shallow(
      <Header isAuthenticated={true} isOnboarded={true} />,
    );

    // Assert a condition
    expect(wrapper.find('header')).toHaveLength(1);
  });

  it('does not load when the user is either not authenticated or not onboarded', async () => {
    // Shallow mount a component with props (child components are not rendered
    const wrapper = shallow(
      <Header isAuthenticated={false} isOnboarded={false} />,
    );

    // Assert a condition
    expect(wrapper.find('header')).toHaveLength(0);
  });
});
