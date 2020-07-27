import React from 'react';

import { Redirect, useLocation } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import './scss/ui.scss';

import Authentication from 'views/Authentication';
import RegistrationView from 'views/Registration';
import Onboarding from 'views/Onboarding';
import Settings from 'views/Settings';
import ViewWrapper from 'views';

function Router({ token }) {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/login/:action?" component={Authentication} />
      <Route path="/register" component={RegistrationView} />
    </Switch>
  );
}

export default Router;
