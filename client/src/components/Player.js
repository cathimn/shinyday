import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom'

export default ({ artist, album }) => {
  const player = useRef(null);
  const [currentSong, setCurrentSong] = useState({
    index: 0,
    name: '',
    songUrl: '',
  });
  const [playing, setPlaying] = useState(false);

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
    setCurrentSong({...album.songs[0]});
    player.current.load();
  }, [album.songs])

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
        <button id="buy-button">Buy Digital Album</button><span style={{ color: "gray", fontSize: "14px", fontWeight: "600"}}>&nbsp;$0 USD</span>
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
