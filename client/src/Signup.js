import React, { useContext, useState } from 'react';
import { baseUrl } from './config';
import { Redirect, Link } from 'react-router-dom';
import { AppContext } from './AppContext';

const Signup = () => {
  const { session, setSession, loaded } = useContext(AppContext);
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [authToken, setAuthToken] = useState(localStorage.getItem('shinyday_session'));
const [errors, setErrors] = useState();

const handleSubmit = async e => {
  e.preventDefault();
  const response = await fetch(`${baseUrl}/user`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
  })

  if (!username || !password || !confirmPassword || !email ) {
    setErrors('Do not leave any fields empty.')
    return;
  }

  if (password !== confirmPassword) {
    setErrors('Passwords do not match.');
    return;
  }

  const res = await response.json();
  if (response.ok) {
    setSession({
      token: res.token,
      id: res.user["id"],
      username: res.user["username"],
      avatarUrl: res.user["avatarUrl"],
      bannerUrl: res.user["bannerUrl"],
    })
    window.localStorage.setItem("shinyday_session", res.token);
  } else {
    setErrors(res.message)
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

if (sessionStorage.token && loaded) {
  return <Redirect to="/" />;
}

return (
  <div className="login center">
    <div className="divider" />
    <h1>fan sign up</h1>
    {errors ? <span className="errors">{errors} Please try again.</span> : null}
    <form onSubmit={handleSubmit}>
      <div className="form-line">
        <label className="form-label">username</label>
        <input type="text"
          className="form-input"
          value={username}
          onChange={updateUsername} />
      </div>
      <div className="form-line">
        <label className="form-label">email</label>
        <input type="email"
          className="form-input"
          value={email}
          onChange={updateEmail} />
      </div>
      <div className="form-line">
        <label className="form-label">password</label>
        <input type="password"
          className="form-input"
          value={password}
          onChange={updatePassword} />
      </div>
      <div className="form-line">
        <label className="form-label">confirm password</label>
        <input type="password"
          className="form-input"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} />
      </div>
      <button id="login-button" type="submit">sign up</button>
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
