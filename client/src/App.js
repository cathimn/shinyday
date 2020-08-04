import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Login';
import Main from './Main';
import Signup from './Signup';
// import SignupArtist from './SignupArtist';

const App = () => {
  const authToken = window.localStorage.getItem('shinyday_session');

  const [token, setToken] = useState(authToken);

  const updateToken = authToken => {
    window.localStorage.setItem('shinyday_session', authToken);
    setToken(authToken);
  };

  return (
    <Router>
      <Switch>
        <Route
          path='/login'
          render={props => <Login {...props} updateToken={updateToken} />}
        />
        {/* <Route
          path='/signup/artist'
          render={SignupArtist}
        /> */}
        <Route 
          path='/signup'
          render={props => <Signup {...props} updateToken={updateToken} />}
        />
        <Route
          path="/"
          render={props => <Main {...props} token={token}/>}
        />
        {/* <Route 
          path="/:username"
          render={props =>}
        /> */}
      </Switch>
    </Router>
  );
};


export default App;
