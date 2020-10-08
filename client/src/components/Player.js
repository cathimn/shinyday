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

  const updateCurrentSong = (e) => {
    e.preventDefault();
    player.current.pause();
    setCurrentSong(album.songs[e.target.value]);
    player.current.currentTime = 0;
    player.current.load();
    player.current.play();
    setPlaying(true);
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
    setCurrentSong(album.songs[0]);
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
            {playing ? "pause" : "play"}
          </button>
        </div>
        <div>
          {album.songs.map((song, index) =>
            <div key={song.id}>
              <button value={index} onClick={updateCurrentSong}>
                <span>▶</span> 
                <span>{song.track_num}.&nbsp;</span>
                {song.name}
              </button>
            </div>)}
        </div>
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
