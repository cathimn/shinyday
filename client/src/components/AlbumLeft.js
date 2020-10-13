import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../AppContext';
import { baseUrl } from '../config';

import Audio from './Audio';

export default ({ artist, album }) => {
  const { session, modalType, setModalType, setShowModal } = useContext(AppContext);
  const player = useRef(null);
  const [currentSong, setCurrentSong] = useState({ ...album.songs[0], index: 0 });
  const [playing, setPlaying] = useState(false);
  const [inCollection, setInCollection] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const updateCurrentSongAndPlay = (e, index) => {
    e.preventDefault();
    setPlaying(false);
    setCurrentSong({...album.songs[index], index: index });
    setPlaying(true);
  }

  const updateCurrentSong = (e, index) => {
    e.preventDefault();
    setPlaying(false);
    setCurrentSong({...album.songs[index], index: index });
  }

  useEffect(() => {
    async function checkCollection () {
      if (!session.token) {
        setLoaded(true);
        return;
      }

      const response = await fetch(`${baseUrl}/collections/id/${album.id}`, {
        headers: { Authorization: `Bearer ${session.token}` },
      })

      if (response.ok) {
        const res = await response.json();
        setInCollection(res.collection);
      }
      setLoaded(true);
    }

    checkCollection();
  }, [album, session.token, modalType])

  return (
    <>
      <div style={{ marginRight: "25px" }}>
        <h2>{album.name}</h2>
        <div style={{ fontSize: "14px" }}>
          by&nbsp;
          <Link to={`/${artist.url}`} style={{ color: "deeppink" }}>{artist.artistName}</Link>
        </div>
        <Audio
          playing={playing}
          setPlaying={setPlaying}
          player={player}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          songs={album.songs}
          lastIndex={album.songs.length - 1} />
        {loaded &&
        <>
        <div id="buy-button-container">
        {inCollection ?
        <>
          <i className="fa fa-heart-o pink" />&nbsp;&nbsp;
          <Link id="owned" to={`/profile/${session.username}`}>You own this</Link>
        </>
        :
        <>
          <button
            onClick={e => {
              e.preventDefault();
              if (!session.token) {
                setModalType("");
                setShowModal(true);
              } else {
                setModalType("Digital Album");
                setShowModal(true);
              }
            }}
            id="buy-button">Buy Digital Album
          </button>
          <span style={{ color: "gray" }}>&nbsp;$0 USD</span>
        </>}
        </div>
        <div>
          {album.songs.map((song, index) =>
          <div key={song.id} className="track__container">
            <button
              className="track__play-button"
              onClick={e => {
                if (currentSong.index !== index) {
                  updateCurrentSongAndPlay(e, index)
                } else {
                  setPlaying(!playing);
                }
              }}>
              {currentSong.index === index && playing ? <i className="fa fa-pause"/> : <i className="fa fa-play"/>}
            </button>
            <span className="track__num">{song.track_num}.&nbsp;</span>
            <button
              className="track__name"
              onClick={e => updateCurrentSong(e, index)}>
              {song.name}</button>
          </div>)}
        </div>
        <p className="album-description">
          {album.description}
          <br/>
          <br/>
          <span>released {new Date(album.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric"})}</span>
        </p>
        </>}
      </div>
      <div>
        <img
          src={album.coverUrl}
          className="large-cover"
          alt="album art" />
      </div>
    </>
  );
}
