import React from 'react';
import { MemoryRouter } from 'react-router';

const ProviderDecorator = storyFn => {
  return <MemoryRouter>{storyFn()}</MemoryRouter>;
};

export default ProviderDecorator;
