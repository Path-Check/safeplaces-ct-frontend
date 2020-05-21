import React from 'react';

import Header from './';

export default {
  title: 'Header',
};

export const Default = () => <Header />;
export const Authenticated = () => <Header isAuthenticated />;
