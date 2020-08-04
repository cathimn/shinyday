import React from 'react';
import { Link } from 'react-router-dom';

// import styles from './Header.module.css'

import Searchbar from './Searchbar';
import LoginModule from './LoginModule';
import UserModule from './UserModule';

export default ({ username, token }) => {


    return (
        <>
            <div className="header">
                <div className="header__left">
                    <div className="header__left--logo">
                        <Link to="/">Image</Link>
                    </div>
                    <div>
                        <Searchbar />
                    </div>
                </div>
                <div className="header__right">
                    {token ? <UserModule username={username} token={token} /> : <LoginModule />}
                </div>
            </div>
        </>
    );
};