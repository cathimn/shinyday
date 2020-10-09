import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const [listenArrow, setListenArrow] = useState(false);

  return (
  <div className="grey">
    <div className="banner">
      <Link to="/monplaisir">
        <div className="banner__left" style={{
          backgroundImage: `url("")`}}>
        <div className={listenArrow ? "overlay hover" : "overlay"}/>
        <div className="left-info" onMouseOver={e => setListenArrow(true)} onMouseLeave={e => setListenArrow(false)}>
          <h1>A Creator With Cat Album Art,<br/> Shinyday's Favorite Artist: Monplaisir</h1>
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
          <div className="banner__right-item">
            <div className="overlay" />
              <div className="right-info overlay">
                <h3>What Is Purplebutter? Find Out Now, Breakmaster Cylinder's I Wanna Hear The Music</h3>
                <span>ALBUM FEATURE</span>
              </div>
          </div>
        </Link>
        <Link to="/bisou">
          <div className="banner__right-item">
            <div className="right-info overlay">
              <h3>Bisou: A Fish Making a Splash</h3>
              <span>ARTIST FEATURE</span>
            </div>
          </div>
        </Link>
        <Link to="/about">
          <div className="banner__right-item">
            <div className="right-info overlay">
              <h3>Inspired By Bandcamp, Check Out The Code Here</h3>
              <span>ABOUT</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
  );
}
