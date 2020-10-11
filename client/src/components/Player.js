import React, { useState, useEffect, useRef, useContext} from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../AppContext';
import { baseUrl } from '../config';

export default ({ artist, album }) => {
  const { session, modalType, setModalType, setShowModal } = useContext(AppContext);
  const player = useRef(null);
  const [currentSong, setCurrentSong] = useState({
    index: 0,
    name: '',
    songUrl: '',
  });
  const [playing, setPlaying] = useState(false);
  const [inCollection, setInCollection] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const updateCurrentSongAndPlay = (e, index) => {
    e.preventDefault();
    player.current.pause();
    setCurrentSong({...album.songs[index]});
    player.current.currentTime = 0;
    player.current.load();
    player.current.play();
    setPlaying(true);
  }

  const updateCurrentSong = (e, index) => {
    e.preventDefault();
    player.current.pause();
    setCurrentSong({...album.songs[index]});
    player.current.currentTime = 0;
    player.current.load();
  }
  
  const play = () => {
    if (!playing) {
      player.current.play();
      setPlaying(true);
    }
  }

  const pause = () => {
    if (playing) {
      player.current.pause();
      setPlaying(false);
    }
  }

  useEffect(() => {
    async function checkCollection () {
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
    setCurrentSong({...album.songs[0]});
    player.current.load();
  }, [album, session.token, modalType])

  return (
    <>
      <div style={{ marginRight: "25px" }}>
        <h1>{album.name}</h1>
        <div>
          by&nbsp;
          <Link to={`/${artist.url}`} style={{ color: "deeppink" }}>{artist.artistName}</Link>
        </div>
        <div id="music-player-container">
          <div id="currently-playing">
            {currentSong.name}<br/>
          </div>
          <audio id="player" controls ref={player} className="hidden">
            <source src={currentSong.song_url} type="audio/mp3" />
          </audio>
          <button onClick={playing ? pause : play} id="play-pause-button">
            <i className={playing ? "fa fa-pause" : "fa fa-play"} />
          </button>
        </div>
        {loaded &&
        <>
        <div id="buy-button-container">
        {inCollection ?
        <>
          <i className="fa fa-heart-o pink" />&nbsp;&nbsp;
          <Link to={`/profile/${session.username}`}>You own this</Link>
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
              onClick={e => updateCurrentSongAndPlay(e, index)}>
              <i className="fa fa-play"/>
            </button>
            <span className="track__num">{song.track_num}.&nbsp;</span>
            <button
              className="track__name"
              onClick={e => updateCurrentSong(e, index)}>
              {song.name}</button>
          </div>)}
        </div>
        <p className="album-description">{album.description}</p>
        <span>released {album.createdAt}</span>
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
