import React from 'react';

import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './store';
import { useSelector } from 'react-redux';
import authSelectors from './ducks/auth/selectors';

import Header from 'components/_global/Header';

import './scss/ui.scss';

import Authentication from 'views/Authentication';
import Trace from 'views/Trace';
import Publish from 'views/Publish';
import Onboarding from 'views/Onboarding';
import Settings from 'views/Settings';

function App() {
  const token = useSelector(state => authSelectors.getToken(state));
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header isAuthenticated={token} />
        <Switch>
          <Route path="/login/:action?" component={Authentication} />
          {!token && <Redirect to="/login" />}
          <Route path="/onboarding/:action?" component={Onboarding} />
          <Route path="/settings/:action?" component={Settings} />
          <Route path="/trace" component={Trace} />
          <Route path="/publish" component={Publish} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
