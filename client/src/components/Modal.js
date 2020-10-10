import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { baseUrl } from '../config';

import { LoginForm } from '../Login'
import { SignupForm } from '../Signup'

const DefaultModal = ({ setModalType }) => (
  <div id="modal-body">
    To follow this artist, please sign up for a free Shinyday account (or log in if you already have one):
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button className="modal-button" onClick={e => setModalType("Sign up")}>Sign up</button>
      <button className="modal-button" onClick={e => setModalType("Log in")}>Log in</button>
    </div>
  </div>
);

const BuyForm = ({ modalType, setModalType, pathname }) => {
  const { session } = useContext(AppContext);
  const [purchase, setPurchase] = useState({
    name: null,
    cover_url: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/collections`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`
      },
      body: JSON.stringify({
        "pathname": pathname
      })
    })

    const res = await response.json();
    if (response.ok) {
      setPurchase(res)
      setModalType("Success!");
    }
  }

  if (modalType === "Success!") {
    return (
      <div id="modal-body" style={{ display: "flex" }}>
        <img src={purchase.cover_url} className="small-cover" alt="album art"/>
        <p style={{ padding: "15px", fontSize: "14px" }}>
          Congratulations, {session.username}!<br/><br/>
          {purchase.name} is now in your collection and available for download.
        </p>
      </div>
    )
  } else {
    return (
      <>
        <form onSubmit={handleSubmit} >
          <div className="form-line">
            <label className="form-label">Name Your Price:</label>
            <input readOnly className="form-input" type="text" value="$ 0"></input>
          </div>
          <div style={{ width: "100%", border: "1px solid whitesmoke", marginBottom: "20px" }}></div>
          <p style={{ fontSize: "12px" }}>
            All music was provided by the <a href="https://freemusicarchive.org/">Free Music Archive</a>.&nbsp;
            "Buying" an album will add it to your collection and make it available to download.
          </p>
          <button id="login-button">Check out now</button>
        </form>
      </>
    )
  }
}

export default () => {
  const { pathname } = useLocation();
  const {
    showModal,
    setShowModal,
    modalType,
    setModalType,
    setSession, } = useContext(AppContext);

  useEffect(() => {
    if (pathname === "/signup" || pathname === "/login") {
      setShowModal(false);
    }
  }, [pathname, setShowModal])

  if (!showModal) {
    return null;
  }

  return (
    <div id="modal-container"
      onClick={e => {
        if (e.target.id === "modal-container") {
          setModalType("");
          setShowModal(false);
        }
      }}>
      <div id="modal-content">
        <div id="modal-header" className={modalType !== "" ? "gray" : null}>
          {modalType}
          <button id="modal-close" onClick={e => {
            setModalType("");
            setShowModal(false);
          }}><i className="fa fa-close" /></button>
        </div>
        {modalType === "" &&
        <DefaultModal setModalType={setModalType} />}
        {modalType === "Log in" &&
        <>
          <LoginForm setSession={setSession} />
          <div className="login__redirects">
            Need an account? <button onClick={e => setModalType("Sign up")}>Sign up as a fan!</button>
          </div>
        </>}
        {modalType === "Sign up" &&
        <>
          <SignupForm setSession={setSession} />
          <div className="login__redirects">
            Already have an account? <button onClick={e => setModalType("Log in")}>Log in.</button>
          </div>
        </>}
        {modalType === "Digital Album" || modalType === "Success!" ?
        <BuyForm modalType={modalType} setModalType={setModalType} pathname={pathname} />
        : null}
      </div>
    </div>
  )
}
