import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';

import { LoginForm } from '../Login'
import { SignupForm } from '../Signup'

const DefaultModal = ({ setHeader }) => (
  <div id="modal-body">
    To follow this artist, please sign up for a free Shinyday account (or log in if you already have one):
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button className="modal-button" onClick={e => setHeader("Sign up")}>Sign up</button>
      <button className="modal-button" onClick={e => setHeader("Log in")}>Log in</button>
    </div>
  </div>
);

export default () => {
  const { pathname } = useLocation();
  const { showModal, setShowModal, session, setSession } = useContext(AppContext);

  const [header, setHeader] = useState("");

  useEffect(() => {
    if (pathname === "/signup" || pathname === "/login") {
      setHeader("");
      setShowModal(false);
    }
  }, [pathname])

  if (!showModal || session.token) {
    return null;
  }

  return (
    <div id="modal-container"
      onClick={e => {
        if (e.target.id === "modal-container") {
          setHeader("");
          setShowModal(false);
        }
      }}>
      <div id="modal-content">
        <div id="modal-header" className={header !== "" && "gray"}>
          {header}
          <button id="modal-close" onClick={e => {
            setHeader("");
            setShowModal(false);
          }}><i className="fa fa-close" /></button>
        </div>
        {header === "" && <DefaultModal setHeader={setHeader} />}
        {header === "Log in" &&
        <>
          <LoginForm setSession={setSession} />
          <div className="login__redirects">
            Need an account? <button onClick={e => setHeader("Sign up")}>Sign up as a fan!</button>
          </div>
        </>}
        {header === "Sign up" &&
        <>
          <SignupForm setSession={setSession} />
          <div className="login__redirects">
            Already have an account? <button onClick={e => setHeader("Log in")}>Log in.</button>
          </div>
        </>}
          
      </div>
    </div>
  )
}
