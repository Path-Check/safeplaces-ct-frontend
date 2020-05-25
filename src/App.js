import React from 'react';
import './scss/ui.scss';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import PathEditor from './components/PathEditor';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import Login from './components/Login';

import { history } from './store';
import HAConfig from './components/HAConfig';
import { useSelector } from 'react-redux';
import authSelectors from './ducks/auth/selectors';
import { Redirect } from 'react-router';

function App() {
  const token = useSelector(state => authSelectors.getToken(state));
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login/:action?" component={Login} />
          {!token && <Redirect to="/login" />}
          <Route path="/onboarding/:action?" component={HAConfig} />
          <Route path="/settings/:action?" component={Settings} />
          <Route path="/:patient?/calendar/:action?" component={Calendar} />
          <Route path="/:patient?/:page?/:action?" component={PathEditor} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
