import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { baseUrl } from './config';

import Login from './Login';
import Main from './Main';
import Signup from './Signup';
import MusicPage from './MusicPage';
import Profile from './Profile';
import TheEnd from './TheEnd'
// import SignupArtist from './SignupArtist';

import Header from './components/Header';
// import Footer from './components/Footer';

const App = () => {
  const authToken = window.localStorage.getItem('shinyday_session');

  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState(authToken);
  const [needLogin, setNeedLogin] = useState(!null);
  const [username, setUsername] = useState('');

  const loadProfile = async authToken => {
    try {
      const response = await fetch(`${baseUrl}/user/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (response.ok) {
        const res = await response.json();
        setNeedLogin(false);
        setUsername(res.username);
      } else {
        setNeedLogin(true);
        window.localStorage.removeItem("shinyday_session")
      }
    } catch (e) {
      console.error(e)
    }
  };

  useEffect(() => {
    setLoaded(true);
    if (token) loadProfile(token)
  }, [token])

  const updateToken = authToken => {
    window.localStorage.setItem('shinyday_session', authToken);
    setToken(authToken);
    loadProfile(authToken);
  };

  if(!loaded) {
    return null;
  }
  return (
    <Router>
      <Header loaded={loaded} needLogin={needLogin} setNeedLogin={setNeedLogin} token={token} username={username} />
        <div className="container">
        <Switch>
          <Route exact path="/404" render={props => <TheEnd />} />
          <Route
            path='/login'
            render={props => <Login {...props} needLogin={needLogin} updateToken={updateToken} />}
          />
          <Route
            path='/signup'
            render={props => <Signup {...props} needLogin={needLogin} updateToken={updateToken} />}
          />
          <Route to="/profile/:user"
            render={props => <Profile />}
          />
          <Route
            exact
            path="/:artistTerm"
            render={props => <MusicPage type="artist"/>}
          />
          <Route
            path="/:artistTerm/:albumTerm"
            render={props => <MusicPage type="album" />}
          />
          <Route
            exact
            path="/"
            render={props => <Main {...props} token={token} username={username}/>}
          />
          <Route path="*" render={props => <div>EROROROROORRO</div>}></Route>
        </Switch>
        </div>
      {/* <Footer /> */}
    </Router>
  );
};


export default App;
