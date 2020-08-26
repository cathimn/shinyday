import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from './config';

const LoginPanel = ({ needLogin, updateToken }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('shinyday_session'));
    const [errors, setErrors] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/session`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });

        if (!login || !password) {
            setErrors('Do not leave any fields empty.')
            return;
        }

        if (response.ok) {
            const { token } = await response.json();
            updateToken(token);
            setAuthToken(token);
        } else {
            const error = await response.json();
            setErrors(error.message);
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
            <div>
                    {errors ? <span className="errors">{errors} Please try again.</span> : null}
            </div>
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
                <Link to="/login" onClick={demo}>Click here</Link> to use a fan's demo account.
                <br />
                Need an account? <Link to="/signup">Sign up here!</Link>
            </div>
        </div>
        </>
    );
};

export default LoginPanel;
