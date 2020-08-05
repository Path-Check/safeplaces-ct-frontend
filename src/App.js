import React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { LastLocationProvider } from 'react-router-last-location';

import { history } from './store';
import { useSelector } from 'react-redux';
import authSelectors from 'ducks/auth/selectors';

import Header from 'components/_global/Header';

import './scss/ui.scss';
import Loader from 'components/_shared/Loader';
import Notifications from 'components/_global/Notifications';

import Router from './Router';
import ZendeskForm from './components/_global/ZendeskForm';

const App = React.memo(() => {
  const token = useSelector(state => authSelectors.getToken(state));
  const isOnboarded =
    useSelector(state => authSelectors.getOnboardingStatus(state)) || false;

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <LastLocationProvider>
          <Loader />
          <Header isAuthenticated={!!token} isOnboarded={isOnboarded} />
          <Router token={token} />
          <ZendeskForm />
        </LastLocationProvider>
      </ConnectedRouter>
      <Notifications />
    </div>
  );
});

export default App;
