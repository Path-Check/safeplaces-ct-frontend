import React from 'react';

import { ConnectedRouter } from 'connected-react-router';

import { ToastProvider } from 'react-toast-notifications';

import { history } from './store';
import { useSelector } from 'react-redux';
import authSelectors from 'ducks/auth/selectors';

import Header from 'components/_global/Header';

import './scss/ui.scss';
import Loader from 'components/_shared/Loader';
import { Notification } from 'components/_global/Notifications';

import Router from './Router';
function App() {
  const token = useSelector(state => authSelectors.getToken(state));
  const isOnboarded =
    useSelector(state => authSelectors.getOnboardingStatus(state)) || false;

  return (
    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={3000}
        placement="bottom-right"
        components={{ Toast: Notification }}
      >
        <ConnectedRouter history={history}>
          <Header isAuthenticated={!!token} isOnboarded={isOnboarded} />
          <Router token={token} />
        </ConnectedRouter>
        <Loader />
      </ToastProvider>
    </div>
  );
}

export default App;
