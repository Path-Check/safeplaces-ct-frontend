import React from 'react';
import { MemoryRouter } from 'react-router';
import '../../src/scss/global.scss';
import '../../src/scss/ui.scss';

const ProviderDecorator = storyFn => {
  return <MemoryRouter>{storyFn()}</MemoryRouter>;
};

export default ProviderDecorator;
