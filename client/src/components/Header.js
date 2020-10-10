import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Searchbar from './Searchbar';
import { LoginModule, UserModule } from './HeaderModules';

import { AppContext } from '../AppContext';

export default () => {
  const { session } = useContext(AppContext);
  
  return (
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
      {session.token
          ? <UserModule />
          : <LoginModule />
      }
    </div>
  </div>
  );
}
