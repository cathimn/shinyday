import React, { useState } from 'react';
import { baseUrl } from './config';
import { Redirect, Link } from 'react-router-dom';

const Signup = ({ needLogin, updateToken }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('shinyday_session'));
    const [errors, setErrors] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/user`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })

        if (!username || !password || !email ) {
            setErrors('Do not leave any fields empty.')
            return;
        }

        if (response.ok) {
            const { token } = await response.json();
            updateToken(token);
            setAuthToken(token);
        } else {
            // const error = await response.json();
            // setErrors(error.message)
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

    if (!needLogin && authToken) {
        return <Redirect to="/" />;
    }

    return (
        <div className="center">
            <div className="divider" />
            <h1>fan sign up</h1>
            <div>
                {errors ? <span className="errors">{errors} Please try again.</span> : null}
            </div>
            <form onSubmit={handleSubmit} className="login__form">
                <div>
                    <label>username</label>
                    <input type="text"
                        value={username}
                        onChange={updateUsername} />
                </div>
                <div>
                    <label>email</label>
                    <input type="email"
                        value={email}
                        onChange={updateEmail} />
                </div>
                <div>
                    <label>password</label>
                    <input type="password"
                        value={password}
                        onChange={updatePassword} />
                </div>
                <button type="submit">sign up</button>
            </form>
            <div className="login__redirects">
                {/* Want to sign up as artist? <Link to="/signup/artist">Sign up here</Link>! */}
                <br />
                Already have an account? <Link to="/login">Log in!</Link>
            </div>
        </div>
    );
};

export default Signup;
