import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import { baseUrl } from './config';

const LoginPanel = () => {
  const { session, setSession, loaded } = useContext(AppContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
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
      setErrors(res.message);
    }
  };

  const demo = e => {
    e.preventDefault();
    setLogin('rin-bear');
    setPassword('password');
    document.getElementById("login-button").click();
  }

  if (session.token && loaded) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="login center">
      <div className="divider" />
      <h1>log in</h1>
      <div>
        {errors && <span className="errors">{errors} Please try again.</span>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-line">
          <label className="form-label">username / email</label>
          <input type="text"
            className="form-input"
            value={login}
            onChange={e => setLogin(e.target.value)} />
        </div>
        <div className="form-line">
          <label className="form-label">password</label>
          <input type="password"
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button id="login-button" type="submit">log in</button>
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
