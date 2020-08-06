import React from 'react';
import { Link } from 'react-router-dom';

import Searchbar from './Searchbar';
import LoginModule from './LoginModule';
import UserModule from './UserModule';

import { imageUrl } from '../config';

export default ({ loaded, setNeedLogin, needLogin, username, token }) => {

    return (
        <>
            <div className="header">
                <div className="header__left">
                    <Link to="/">
                        <div className="header__left--logo">
                            <img src="/coloredtent.svg" className="img-logo" />
                            <div className="logo">shinyday</div>
                        </div>
                    </Link>
                    <div>
                        <Searchbar />
                    </div>
                </div>
                <div className="header__right">
                    {!needLogin
                        ? <UserModule setNeedLogin={setNeedLogin} username={username} token={token} />
                        : <LoginModule />
                    }
                </div>
            </div>
        </>
    );
};