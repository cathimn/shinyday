import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import { baseUrl } from './config';

export const LoginForm = ({ setSession }) => {
  const { setShowModal } = useContext(AppContext);
  const [errors, setErrors] = useState();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

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
      setShowModal(false);
    } else {
      setErrors(res.message);
    }
  };

  const demo = e => {
    e.preventDefault();
    setLogin('rin-bear');
    setPassword('password');
    setTimeout(() => document.getElementById("login-button").click(), 0);
  }

  return (
  <>
    <div className={errors ? "errors" : "errors hidden"}>
      {errors} Please try again.
    </div>
    <form onSubmit={handleSubmit}>
      <div className="form-line">
        <label className="form-label">Username / Email</label>
        <input type="text"
          className="form-input"
          value={login}
          onChange={e => setLogin(e.target.value)} />
      </div>
      <div className="form-line">
        <label className="form-label">Password</label>
        <input type="password"
          className="form-input"
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </div>
      <button id="login-button" type="submit">Log in</button>
    </form>
    <div className="login__redirects">
      <button onClick={demo}>Click here</button> to use a fan's demo account.
      <br />
    </div>
  </>
  );
}

export const LoginPage = () => {
  const { session, setSession, loaded } = useContext(AppContext);

  if (session.token && loaded) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="login center">
      <div className="divider" />
      <h1>Log in</h1>
      <LoginForm setSession={setSession}/>
      <div className="login__redirects">
        Need an account? <Link to="/signup">Sign up here!</Link>
      </div>
    </div>
    </>
  );
};
