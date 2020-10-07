import React from 'react';
import { Link } from 'react-router-dom';

import Searchbar from './Searchbar';
import LoginModule from './LoginModule';
import UserModule from './UserModule';

export default ({ artistAccount, setNeedLogin, needLogin, username, token }) => (
  <div className="header">
    <div className="header__left">
      <Link to="/">
        <div id="logo">
          <img id="logo-svg" src="/coloredtent.svg" alt="logo" />
          <div id="logo-text">shinyday</div>
        </div>
      </Link>
      <div>
        <Searchbar />
      </div>
    </div>
    <div className="header__right">
      {!needLogin
          ? <UserModule
              artistAccount={artistAccount}
              setNeedLogin={setNeedLogin}
              username={username}
              token={token} />
          : <LoginModule />
      }
    </div>
  </div>
);
