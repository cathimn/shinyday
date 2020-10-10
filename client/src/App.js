import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

import { baseUrl } from './config';
import { AppContext } from './AppContext';

import { LoginPage } from './Login';
import { SignupPage } from './Signup';
import Main from './Main';
import MusicPage from './MusicPage';
import Profile from './Profile';
import Header from './components/Header';
import Modal from './components/Modal';

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
  const [ showModal, setShowModal ] = useState(false);
  
  useEffect(() => {
    async function loadProfile() {
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

    loadProfile();
  }, [authToken])

  if(!loaded) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{ session, setSession, loaded, showModal, setShowModal }}>
      <Router>
        <ScrollToTop />
        <Header session={session} />
        <Modal />
          <div className="container">
          <Switch>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/signup'>
              <SignupPage />
            </Route>
            <Route path='/profile/:username'>
              <Profile />
            </Route>
            <Route path="/:artistTerm/:albumTerm">
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
