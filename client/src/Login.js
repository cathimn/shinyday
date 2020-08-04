import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from './config';

import Header from './components/Header'

const LoginPanel = ({ updateToken }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('shinyday_session'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/session`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            updateToken(token);
            setAuthToken(token);
        }
    };

    const demo = e => {
        setLogin('rin-bear');
        setPassword('password');
    }

    const updateLogin = e => {
        setLogin(e.target.value);
    };

    const updatePassword = e => {
        setPassword(e.target.value);
    };

    if (authToken) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <Header />
            <div className="center">
                <form
                    onSubmit={handleSubmit}
                    className="login__form"
                >
                    <div>
                        <label>Username / Email</label>
                        <input
                            type="text"
                            value={login}
                            onChange={updateLogin} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={updatePassword} />
                    </div>
                    <button type="submit">Log in</button>
                </form>
                <div className="login__redirects">
                    <Link to="/login" onClick={demo}>This is a link to try a demo.</Link>
                    <br />
                    Need to sign up? <Link to="/signup">Sign up here!</Link>
                </div>
            </div>
        </>
    );
};

export default LoginPanel;