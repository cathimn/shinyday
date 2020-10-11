
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppContext } from '../AppContext';
import { baseUrl } from '../config';

export const LoginModule = () => {
  const { pathname } = useLocation();

  return (
  <>
    { pathname !== "/signup" &&
      <Link to="/signup">
        <div className="module">
          sign up
        </div>
      </Link>}
    { pathname !== "/login" &&
      <Link to="/login">
        <div className="module">
          login
        </div>
      </Link>}
  </>
  );
}

const Menu = ({ setMenuDisplay }) => {
  const { session, setSession } = useContext(AppContext);

  const logout = async (e) => {
    const response = await fetch(`${baseUrl}/session`, {
      method: 'delete',
      headers: { Authorization: `Bearer ${session.token}` }
    })

    const res = await response.json();
    if (response.ok) {
      setSession({
        token: null,
        id: null,
        username: null,
        isArtist: null,
      });
      window.localStorage.removeItem("shinyday_session");
    } else {
      console.log(res)
    }

  }

  const closeMenu = (e) => {
    if (e.target.id !== "module__menu") {
      setMenuDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  });

  return (
    <div id="module__menu">
      <Link className="module__menu--item" to={`/profile/${session.username}`}>
        <div>
          <span>{session.username}</span><br/>
          <span style={{ fontSize: "10px" }}>view collection</span>
        </div>
      </Link>
      <Link className="module__menu--item" to={`/profile/${session.username}`}>
        profile
      </Link>
      <div style={{ borderBottom: "1px solid whitesmoke", margin: "0 10px" }}/>
      <button id="module__menu--logout"
        onClick={logout}>logout
      </button>
    </div>
  )
}

export const UserModule = () => {
  const { session } = useContext(AppContext);

  const [menuDisplay, setMenuDisplay] = useState(false);

  return (
    <>
      <Link to={`/profile/${session.username}`}>
        <div className="module">
          <i className="fa fa-heart-o heart" />
        </div>
      </Link>
      <div 
        style={ menuDisplay ? { backgroundColor: "whitesmoke" } : {}}
        className="module" onClick={e => setMenuDisplay(!menuDisplay)}>
        <img src={session.avatarUrl} alt="avatar" className="module__avatar"/>
        {menuDisplay && <Menu setMenuDisplay={setMenuDisplay} />}
      </div>
    </>
  );
}
