import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

import { baseUrl } from './config';

import Login from './Login';
import Main from './Main';
import Signup from './Signup';
import MusicPage from './MusicPage';
import Profile from './Profile';
import Header from './components/Header';
import { AppContext } from './AppContext';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const authToken = window.localStorage.getItem("shinyday_session");

  const [session, setSession] = useState({
    token: null,
    id: null,
    username: null,
    isArtist: null,
    avatarUrl: null,
    bannerUrl: null,
  });
  const [ loaded, setLoaded ] = useState(false);
  
  const loadProfile = async () => {

    if (authToken) {
      const response = await fetch(`${baseUrl}/user/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      const res = await response.json();
      if (response.ok) {
        setSession({
          token: authToken,
          id: res.id,
          username: res.username,
          isArtist: res.checkArtist,
          avatarUrl: res.avatarUrl,
          bannerUrl: res.bannerUrl,
        })
      } else {
        setSession({
          token: null,
          id: null,
          username: null,
          isArtist: null,
          avatarUrl: null,
          bannerUrl: null
        })
        window.localStorage.removeItem("shinyday_session");
      }
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadProfile();
  }, [authToken])

  // const updateToken = authToken => {
  //   window.localStorage.setItem('shinyday_session', authToken);
  //   setToken(authToken);
  //   loadProfile(authToken);
  // };

  if(!loaded) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{ session, setSession, loaded }}>
      <Router>
        <ScrollToTop />
        <Header session={session} />
          <div className="container">
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/profile/:username'>
              <Profile />
            </Route>
            <Route path="/:artistTerm/album/:albumTerm">
              <MusicPage type="album"/>
            </Route>
            <Route path="/:artistTerm">
              <MusicPage type="artist" />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
          </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
