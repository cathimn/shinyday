import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

import { baseUrl } from './config';

import Login from './Login';
import Main from './Main';
import Signup from './Signup';
import MusicPage from './MusicPage';
import Profile from './Profile';

import Header from './components/Header';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);

  return null;
}

const App = () => {
  const authToken = window.localStorage.getItem('shinyday_session');

  const [ loaded, setLoaded ] = useState(false);
  const [ token, setToken ] = useState(authToken);
  const [ needLogin, setNeedLogin ] = useState(!null);
  const [ username, setUsername ] = useState('');
  const [ artistAccount, setArtistAccount ] = useState({});

  const loadProfile = async authToken => {
    const response = await fetch(`${baseUrl}/user/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    if (response.ok) {
      const res = await response.json();
      setNeedLogin(false);
      setUsername(res.username);

      if (res.checkArtist !== null) {
        setArtistAccount(res.checkArtist)
      }
    } else {
      setNeedLogin(true);
      window.localStorage.removeItem("shinyday_session")
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
      {/* <Header
        artistAccount={artistAccount}
        needLogin={needLogin}
        setNeedLogin={setNeedLogin}
        token={token}
        username={username} /> */}
        <div className="container">
        <Switch>
          <Route path='/login'>
            <Login needLogin={needLogin} updateToken={updateToken} />
          </Route>
          <Route path='/signup'>
            <Signup needLogin={needLogin} updateToken={updateToken} />
          </Route>
          <Route path='/profile/:username'>
            <Profile needLogin={needLogin} loggedInUser={username} />
          </Route>
          <Route exact path="/:artistTerm">
            <MusicPage type="artist" username={username} />
          </Route>
          <Route path="/:artistTerm/album/:albumTerm">
            <MusicPage type="album" username={username} />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
        </div>
    </Router>
  );
};

export default App;
