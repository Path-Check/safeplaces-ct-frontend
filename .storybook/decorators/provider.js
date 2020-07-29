import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import '../../src/scss/global.scss';
import '../../src/scss/ui.scss';

import { store } from '../../src/store';

const ProviderDecorator = storyFn => {
  return (
    <Provider store={store}>
      <MemoryRouter>{storyFn()}</MemoryRouter>
    </Provider>
  );
};

export default ProviderDecorator;
