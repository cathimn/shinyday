import React, { useState } from 'react';
import { baseUrl } from './config';
import { Redirect, Link } from 'react-router-dom';
import FormInput from './components/FormInput';

const Signup = ({ updateToken }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('shinyday_session'));

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/user`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })

        if (response.ok) {
            const { token } = await response.json();
            updateToken(token);
            setAuthToken(token);
        }
    };

    const updateUsername = e => {
        setUsername(e.target.value);
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePassword = e => {
        setPassword(e.target.value);
    }

    if (authToken) {
        return <Redirect to="/" />;
    }

    return (
        <div className="center">
            <form onSubmit={handleSubmit} className="login__form">
                <div>
                    <label>Username</label>
                    <input type="text"
                        value={username}
                        onChange={updateUsername} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email"
                        value={email}
                        onChange={updateEmail} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        value={password}
                        onChange={updatePassword} />
                </div>
                <button type="submit">Sign up</button>
            </form>
            <div className="login__redirects">
                Want to sign up as artist? <Link to="/signup/artist">Sign up here</Link>!
                <br />
                Already have an account? <Link to="/login">Log in!</Link>
            </div>
        </div>
    );
};

export default Signup;