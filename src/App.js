import React from 'react';
import './scss/ui.scss';

import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PathEditor from './components/PathEditor';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import Login from './components/Login';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login/:action?" component={Login} />
          <Route path="/settings/:action?" component={Settings} />
          <Route path="/:patient?/calendar/:action?" component={Calendar} />
          <Route path="/:patient?/:page?/:action?" component={PathEditor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
