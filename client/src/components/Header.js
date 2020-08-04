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
            <div className={styles.header}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link to="/">Image</Link>
                    </div>
                    <div className={styles.search}>
                        <Searchbar />
                    </div>
                </div>
                <div className={styles.right}>
                    {token ? <UserModule username={username} token={token} /> : <LoginModule />}
                </div>
            </div>
        </>
    );
};