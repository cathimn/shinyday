import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { baseUrl } from './config';

import FollowButton from './components/FollowButton'
import { AppContext } from './AppContext';

export default () => {
  const { username } = useParams();
  const { session } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);

  const [tab, setTab] = useState("collection");
  const [allowEditMode, setAllowEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: null,
    avatarUrl: null,
    bannerUrl: null,
  });
  const [following, setFollowing] = useState({
    artists: [],
    total: null,
  });
  const [collection, setCollection] = useState({
    albums: [],
    total: null,
  });

  useEffect(() => {
    if (username === session.username) {
      setAllowEditMode(true);
    }
  }, [username, session])

  useEffect(() => {
    async function fetchUserInfo () {
      const response = await fetch(`${baseUrl}/user/${username}`);

      if (response.ok) {
        const res = await response.json();
        console.log(res)
        setUserInfo({
          id: res.user.id,
          avatarUrl: res.user.avatar_url,
          bannerUrl: res.user.banner_url,
        });
        setFollowing({...res.following});
        setCollection({...res.collection});
      }
    }

    // async function fetchFollows() {
    //   const response = await fetch(`${baseUrl}/follows/${username}`);

    //   if (response.ok) {
    //     const res = await response.json();
    //     console.log(res)
    //     setFollowing({
    //       artists: res.artists,
    //       total: res.total,
    //     });
    //   }
    // }

    fetchUserInfo();
  }, [username])

  return (
  <>
    <div id="profile-header" style={{ backgroundImage: `url(${userInfo.bannerUrl})`}} />
    <div id="profile-container">
      <div id="profile-bio">
        <img src={userInfo.avatarUrl} alt="avatar" id="profile-avatar"/>
        <h1 id="profile-username">{username}</h1>
      </div>
      <div className="profile__tabs">
        <button
          className={tab === "collection" ? "tab-button selected" : "tab-button"}
          onClick={e => setTab("collection")}>
          <strong>collection</strong>&nbsp;&nbsp;<span></span>
        </button>
        <button 
          className={tab === "following" ? "tab-button selected" : "tab-button"}
          onClick={e => setTab("following")}>
          <strong>following</strong>&nbsp;&nbsp;<span>{following.total}</span>
        </button>
      </div>
      {tab === "collection" && <Collection />}
      {tab === "following" && <Following artists={following.artists} />}
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

const Following = ({ artists }) => {
  
  return (
    <div className="profile__following-box">
      {artists.map(artist => 
        <div key={artist.id} className="follow-card">
          <img src={artist.avatar_url} alt="artist avatar" />
          <Link to={`/${artist.url}`}>
            {artist.artist_name}
          </Link>
          <FollowButton artistId={artist.id} profile="true" />
        </div>)}
    </div>
  )
}
