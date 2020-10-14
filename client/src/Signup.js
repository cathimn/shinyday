import React, { useContext, useState } from 'react';
import { baseUrl } from './config';
import { Redirect, Link } from 'react-router-dom';
import { AppContext } from './AppContext';

export const SignupForm = ({ setSession }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/user`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    if (!username || !password || !email) {
      setErrors('Do not leave any fields empty.')
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

  return (
    <>
      <div className={errors ? "errors" : "errors hidden"}>
        {errors} Please try again.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-line">
          <label className="form-label">Username</label>
          <input type="text"
            className="form-input"
            value={username}
            onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-line">
          <label className="form-label">Email</label>
          <input type="email"
            className="form-input"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-line">
          <label className="form-label">Password</label>
          <input type="password"
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button id="login-button" type="submit">Sign up</button>
      </form>
      {/* <div className="login__redirects">
        Want to sign up as artist? <Link to="/signup/artist">Sign up here</Link>!
        <br />
      </div> */}
    </>
  );
}

export const SignupPage = () => {
    const { session, setSession } = useContext(AppContext);

  if (session.token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login center">
      <div className="divider" />
      <h1>Fan sign up</h1>
      <SignupForm setSession={setSession} />
      <div className="login__redirects">
          Already have an account? <Link to="/login">Log in!</Link>
      </div>
    </div>
  );
};

