import React from 'react';

import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { ToastProvider } from 'react-toast-notifications';

import { history } from './store';
import { useSelector } from 'react-redux';
import authSelectors from 'ducks/auth/selectors';

import Header from 'components/_global/Header';

import './scss/ui.scss';

import Authentication from 'views/Authentication';
import Trace from 'views/Trace';
import Publish from 'views/Publish';
import Onboarding from 'views/Onboarding';
import Settings from 'views/Settings';
import Loader from 'components/_shared/Loader';
import { Notification } from 'components/_global/Notifications';

function App() {
  const token = useSelector(state => authSelectors.getToken(state));
  const isOnboarded =
    useSelector(state => authSelectors.getOnboardingStatus(state)) || false;

  return (
    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-right"
        components={{ Toast: Notification }}
      >
        <ConnectedRouter history={history}>
          <Header isAuthenticated={!!token} isOnboarded={isOnboarded} />
          <Switch>
            <Route path="/login/:action?" component={Authentication} />
            {!token && <Redirect to="/login" />}
            <Route path="/onboarding/:action?" component={Onboarding} />
            <Route path="/settings/:action?" component={Settings} />
            <Route path="/trace" component={Trace} />
            <Route path="/publish" component={Publish} />
          </Switch>
        </ConnectedRouter>
        <Loader />
      </ToastProvider>
    </div>
  );
}

export default App;
