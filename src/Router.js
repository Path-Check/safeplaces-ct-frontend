import React from 'react';

import { Redirect, useLocation } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import './scss/ui.scss';

import Authentication from 'views/Authentication';

import Onboarding from 'views/Onboarding';
import Settings from 'views/Settings';
import ViewWrapper from 'views';
import { useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';
import ModalSwitch from 'components/_global/Modal/ModalSwitch';
import {
  AccessCode,
  PersonalInformation,
  PhoneNumber,
  ResetPassword,
} from './views/Registration';

function Router({ token }) {
  const { pathname } = useLocation();
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const mode = useSelector(state => applicationSelectors.getMode(state));
  const publicRoutes = [
    '/registration',
    '/phone',
    '/verify',
    '/reset-password',
  ];
  const isPublicRoute = publicRoutes.indexOf(pathname) > -1;

  return (
    <>
      <Switch>
        <Route path="/login/:action?" component={Authentication} />
        {!token && !isPublicRoute && (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: pathname || '/' },
            }}
          />
        )}
        <Route path="/onboarding/:action?" component={Onboarding} />
        <Route path="/reset-password" component={ResetPassword} />

        <Route path="/settings/:action?" component={Settings} />
        <Route path="/trace" render={() => <ViewWrapper viewType="trace" />} />
        <Route path="/registration" component={PersonalInformation} />
        <Route path="/phone" component={PhoneNumber} />
        <Route path="/verify" component={AccessCode} />
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
      <ModalSwitch mode={mode} status={appStatus} />
    </>
  );
}

export default Router;
