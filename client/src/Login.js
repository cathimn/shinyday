import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';

const LoginPanel = ({ updateToken }) => {
    const [login, setLogin] = useState('rin-bear');
    const [password, setPassword] = useState('password');
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
            <div>
                <form onSubmit={handleSubmit}>
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
            </div>
        </>
    );
};

export default LoginPanel;