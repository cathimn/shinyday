import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const [listenArrow, setListenArrow] = useState(false);

  return (
  <div className="grey">
    <div className="banner">
      <Link to="/monplaisir">
        <div className="banner__left" style={{
          backgroundImage: `url("https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/good/art.jpg")`}}>
        <div className={listenArrow ? "overlay hover" : "overlay"}/>
        <div className="left-info" onMouseOver={e => setListenArrow(true)} onMouseLeave={e => setListenArrow(false)}>
          <h1>Two Albums With Cat Art,<br/> Shinyday's Favorite Artist: Monplaisir</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button id="listen-now">
            listen now
            <i className={listenArrow ? "fa fa-long-arrow-right show" : "fa fa-long-arrow-right gone"}></i>
          </button>
        </div>
      </div>
      </Link>
      <div className="banner__right">
        <Link to="/breakmastercylinder/iwannahearthemusic">
          <div className="banner__right-item" style={{
            backgroundImage: `url("https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/header.jpg")`
          }}>
            <div className="overlay" />
              <div className="right-info overlay">
                <h3>What Is Purplebutter? Learn About It!<br/>Breakmaster Cylinder's I Wanna Hear The Music</h3>
                <span>ALBUM FEATURE</span>
              </div>
          </div>
        </Link>
        <Link to="/bisou">
          <div className="banner__right-item" style={{
            backgroundImage: `url("https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/avatar.jpg")`
          }}>
            <div className="right-info overlay">
              <h3>Bisou: A Small Fish Making a Big Splash</h3>
              <span>ARTIST FEATURE</span>
            </div>
          </div>
        </Link>
        <a href="https://github.com/cathimn/shinyday">
          <div className="banner__right-item" style={{
            backgroundImage: `url("https://avatars1.githubusercontent.com/u/583231?s=460&u=a59fef2a493e2b67dd13754231daf220c82ba84d&v=4")`
          }}>
            <div className="right-info overlay">
              <h3>Inspired By Bandcamp,<br/>Created Using React and Express,<br/>Check Out The GitHub Repo</h3>
              <span>GITHUB LINK</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  );
}
