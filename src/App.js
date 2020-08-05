import React, { useEffect } from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { LastLocationProvider } from 'react-router-last-location';

import { history } from './store';
import { useSelector, useDispatch } from 'react-redux';
import authSelectors from 'ducks/auth/selectors';

import Header from 'components/_global/Header';

import './scss/ui.scss';
import Loader from 'components/_shared/Loader';
import Notifications from 'components/_global/Notifications';

import Router from './Router';
import contentActions from 'ducks/content/actions';

const App = React.memo(() => {
  const dispatch = useDispatch();
  const token = useSelector(state => authSelectors.getToken(state));
  const { language } = useSelector(state => state.content);
  const { rehydrated } = useSelector(state => state._persist);
  const isOnboarded =
    useSelector(state => authSelectors.getOnboardingStatus(state)) || false;

  useEffect(() => {
    if (!rehydrated) {
      return;
    }

    if (!language) {
      dispatch(contentActions.setLanguage('en'));
    }
  }, [rehydrated]);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <LastLocationProvider>
          <Loader />
          <Header isAuthenticated={!!token} isOnboarded={isOnboarded} />
          <Router token={token} />
        </LastLocationProvider>
      </ConnectedRouter>
      <Notifications />
    </div>
  );
});

export default App;
