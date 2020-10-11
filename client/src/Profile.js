import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { baseUrl } from './config';

import FollowButton from './components/FollowButton'
import { AppContext } from './AppContext';
import { Footer } from './components/Footer';

export default () => {
  const { username } = useParams();
  const { session } = useContext(AppContext);
  
  const [tab, setTab] = useState("collection");
  const [editMode, setEditMode] = useState(false);
  const [allowEditMode, setAllowEditMode] = useState(false);
  const [changed, setChanged] = useState(false);

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
        setUserInfo({
          id: res.user.id,
          avatarUrl: res.user.avatar_url,
          bannerUrl: res.user.banner_url,
        });
        setFollowing({...res.following});
        setCollection({...res.collection});
        setChanged(false);
      }
    }

    fetchUserInfo();
  }, [username, changed])

  return (
  <>
    <div id="profile-header" style={{ backgroundImage: `url(${userInfo.bannerUrl})`}} />
    <div id="profile-container">
      <div id="profile-bio">
        <img src={userInfo.avatarUrl} alt="avatar" id="profile-avatar"/>
        <h1 id="profile-username">{username}</h1>
        {allowEditMode && <button>EDIT PROFILE <i className="fa fa-pencil"/></button>}
      </div>
      <div className="profile__tabs">
        <button
          className={tab === "collection" ? "tab-button selected" : "tab-button"}
          onClick={e => setTab("collection")}>
          <strong>collection</strong>&nbsp;&nbsp;<span>{collection.total}</span>
        </button>
        <button 
          className={tab === "following" ? "tab-button selected" : "tab-button"}
          onClick={e => setTab("following")}>
          <strong>following</strong>&nbsp;&nbsp;<span>{following.total}</span>
        </button>
      </div>
      {tab === "collection" && <Collection albums={collection.albums} allowEditMode={allowEditMode} setChanged={setChanged} />}
      {tab === "following" && <Following artists={following.artists} />}
    </div>
    <div className="divider"/>
    <Footer />
  </>
  )
}

const Collection = ({ albums, allowEditMode, setChanged }) => (
  <div className="profile__content">
    {albums.map(album => <CollectionCard key={album.id + "album"} setChanged={setChanged} album={album} allowEditMode={allowEditMode} />)}
  </div>
);

const CollectionCard = ({ album, allowEditMode, setChanged }) => {
  const { session } = useContext(AppContext);
  const [showFavSelect, setShowFavSelect] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selectedSong, setSelectedSong] = useState("");

  const handleFavoriteChange = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/collections/favorite`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`
      },
      body: JSON.stringify({
        "songId": selectedSong,
        "albumId": album.id
      })
    })

    if (response.ok) {
      const res = await response.json();
      setShowFavSelect(false);
      setChanged(true);
    }
  }

  return (
    <div key={album.id}
      className="collection-card"
      onMouseEnter={e => setHovered(true)}
      onMouseLeave={e => {
        setHovered(false);
        setShowFavSelect(false);
      }}
      >
      <Link to={`/${album.artist.url}/${album.url}`}>
        <img src={album.cover_url} className="small-album-card__image" alt="album cover" />
      </Link>
      <div className="collection-blurb">
        <Link to={`/${album.artist.url}/${album.url}`}>
          <span className="small-album-card__name">{album.name}</span><br/>
          <span>by {album.artist.artist_name}</span>
        </Link>
        <br />
        <div>
          {album.favorite ?
          <>
          <span style={{ color: "gray" }}>favorite track</span>
          <span className={hovered && allowEditMode ? "" : "gone"}>
          &nbsp;-
            <button
              className="pink small"
              onClick={e => setShowFavSelect(!showFavSelect)}>
              edit
            </button>
          </span>
          <br/>
          <span>{album.songs.filter((song) => song.id === Number(album.favorite))[0].name}</span>
          </>
          :
            <span className={hovered && allowEditMode ? "" : "gone"}>
              <span style={{ color: "gray" }}>favorite track</span>
              &nbsp;-
              <button
                className="pink small"
                onClick={e => setShowFavSelect(!showFavSelect)}>
                  set
              </button>
            </span>
          }
          <form className={showFavSelect ? "favorite-form" : "favorite-form gone"}>
            <select
              className={showFavSelect ? "" : "gone"}
              value={selectedSong}
              onChange={e => setSelectedSong(e.target.value)}>
              <option disabled value="">select a track</option>
              {album.songs.map(song => <option key={song.name} value={song.id}>{song.name}</option>)}
            </select>
            <div>
              <button onClick={handleFavoriteChange}>SAVE</button>
              <button
                onClick={e=> {
                  e.preventDefault();
                  setShowFavSelect(false);
                }}>
                CANCEL</button>
            </div>
          </form>

        </div>
        <br/>
        {allowEditMode && <a>download</a>}
      </div>
    </div>
  )
}

const Following = ({ artists }) => (
  <div className="profile__content">
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
