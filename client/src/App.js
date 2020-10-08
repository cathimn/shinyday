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
  const [session, setSession] = useState({
    token: null,
    id: null,
    username: null,
    artist: false,
  });
  const authToken = window.localStorage.getItem("shinyday_session");
  const [ loaded, setLoaded ] = useState(false);
  const [ token, setToken ] = useState(authToken);


  const loadProfile = async authToken => {
    const response = await fetch(`${baseUrl}/user/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
    } else {
      window.localStorage.removeItem("shinyday_session")
    }
    setLoaded(true);
    console.log("laodfdfjsj")
  };

  useEffect(() => {
    loadProfile();
  }, [])

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
      value={{ session, setSession }}>
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
