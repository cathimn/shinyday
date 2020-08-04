import React from 'react';
import { Link } from 'react-router-dom';

// import styles from './Header.module.css'

import Searchbar from './Searchbar';
import LoginModule from './LoginModule';
import UserModule from './UserModule';
// import { baseUrl } from '../config';

export default ({ username, token }) => {


    return (
        <>
            <div className="header">
                <div className="left">
                    <div className="logo">
                        <Link to="/">Image</Link>
                    </div>
                    <div className="search">
                        <Searchbar />
                    </div>
                </div>
                <div className="right">
                    {token ? <UserModule username={username} token={token} /> : <LoginModule />}
                </div>
            </div>
        </>
    );
};