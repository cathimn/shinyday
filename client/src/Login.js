import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from './config';

const LoginPanel = ({ needLogin, updateToken }) => {
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

    if (!needLogin && authToken) {
        return <Redirect to="/" />;
    }

    return (
        <>
        <div className="center">
            <div className="divider" />
            <h1>log in</h1>
            <form onSubmit={handleSubmit} className="login__form">
                <div>
                    <label>username / email</label>
                    <input type="text"
                        value={login}
                        onChange={updateLogin} />
                </div>
                <div>
                    <label>password</label>
                    <input type="password"
                        value={password}
                        onChange={updatePassword} />
                </div>
                <button type="submit">log in</button>
            </form>
            <div className="login__redirects">
                Use a <Link to="/login" onClick={demo}>demo account</Link> as a fan.
                <br />
                Want to sign up? <Link to="/signup">Sign up here!</Link>
            </div>
        </div>
        </>
    );
};

export default LoginPanel;
