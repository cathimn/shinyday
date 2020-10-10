import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { baseUrl } from './config';

import FollowButton from './components/FollowButton'
import { AppContext } from './AppContext';

export default ({ needLogin, loggedInUser, artistAccount }) => {

  const { username } = useParams();
  const { session } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);

  const [tab, setTab] = useState("collection");
  const [allowEditMode, setAllowEditMode] = useState(false);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (username === session.username) {
      setAllowEditMode(true);
    }
  }, [username, session])

  useEffect(() => {
    async function fetchFollows() {
      const response = await fetch(`${baseUrl}/follows/${username}`);

      if (response.ok) {
        const res = await response.json();
        console.log(res)
        setFollowing(res);
      }
    }

    fetchFollows();
  }, [username])

  return (
  <>
    <div className="profile__header" />
    <div className="profile-container">
      <div className="profile__fan-bio">
        <img src="" alt="avatar" id="profile-avatar"/>
          <h1>{username}</h1>
          <div>
          </div>
      </div>
      <div className="profile__tabs">
        <button onClick={e => setTab("collection")}>
          collection <span></span>
        </button>
        <button onClick={e => setTab("following")}>
          following <span></span>
        </button>
      </div>
      {tab === "collection" && <Collection />}
      {tab === "following" && <Following following={following} />}
    </div>
  </>
  )
}

const Collection = () => {

  return (
    <div>

    </div>
  )
}

const Following = ({ following }) => {
  
  return (
    <div className="profile__following-box">
      {following.map(artist => 
        <div className="follow-card">
          <img src="" alt="artist avatar" />
          <div className="follow-card--blurb">
            <Link to={`/${artist.url}`}>
              {artist.name}
            </Link>
            <div className="follow-card__button">
              <FollowButton artistId={artist.id} />
            </div>
          </div>
        </div>)}
    </div>
  )
}
