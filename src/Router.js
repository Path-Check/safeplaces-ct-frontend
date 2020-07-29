import React from 'react';

import { Redirect, useLocation } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import './scss/ui.scss';

import Authentication from 'views/Authentication';

import Onboarding from 'views/Onboarding';
import Settings from 'views/Settings';
import ViewWrapper from 'views';

function Router({ token }) {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/login/:action?" component={Authentication} />
      {!token && (
        <Redirect
          to={{
            pathname: '/login',
            state: { referrer: location.pathname || '/' },
          }}
        />
      )}
      <Route path="/onboarding/:action?" component={Onboarding} />
      <Route path="/settings/:action?" component={Settings} />
      <Route path="/trace" render={() => <ViewWrapper viewType="trace" />} />
      <Route
        path="/publish"
        render={() => <ViewWrapper viewType="publish" />}
      />
      <Redirect
        from="/"
        to={{
          pathname: '/trace',
        }}
      />
    </Switch>
  );
}

export default Router;
