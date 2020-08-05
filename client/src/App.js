import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { baseUrl } from './config';

import Login from './Login';
import Main from './Main';
import Signup from './Signup';
// import SignupArtist from './SignupArtist';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const authToken = window.localStorage.getItem('shinyday_session');

  const [token, setToken] = useState(authToken);
  const [username, setUsername] = useState('');

  const loadProfile = async authToken => {
    const response = await fetch(`${baseUrl}/user/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (response.ok) {
      const res = await response.json();
      setUsername(res.username);
    } else {
      console.error("Handle invalid token.")
    }
  };

  useEffect(() => {
    if (token) {
      loadProfile(token);
    }
  }, [token])

  const updateToken = authToken => {
    window.localStorage.setItem('shinyday_session', authToken);
    setToken(authToken);
  };

  return (
    <Router>
      <Header token={token} username={username} />
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
            exact
            path="/"
            render={props => <Main {...props} token={token} username={username}/>}
          />
          <Route path="*" render={props => <div>eRORO</div>}></Route>
          {/* <Route 
            path="/:username"
            render={props =>}
          /> */}
        </Switch>
      <Footer />
    </Router>
  );
};


export default App;
