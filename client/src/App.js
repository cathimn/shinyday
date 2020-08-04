import React, { useState } from 'react';
import Login from './Login';
import Main from './Main';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  const authToken = window.localStorage.getItem('shinyday_session');

  const [token, setToken]  = useState(authToken);

  const updateToken = authToken => {
    window.localStorage.setItem('shinyday_session', authToken);
    setToken(authToken);
  }

  return (
    <Router>
      <Switch>
        <Route
          path='/login'
          render={props => <Login {...props} updateToken={updateToken} />}
        />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
};


export default App;
