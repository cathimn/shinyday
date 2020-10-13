import React, { useState, useEffect } from 'react';

export default ({ playing, setPlaying, player, currentSong, setCurrentSong, songs, lastIndex }) => {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(null);

  const getTime = (time) => {
    if (!isNaN(time)) {
      return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
  }

  useEffect(() => {
    const audio = document.getElementById("player");

    const setInitTime = () => {
      setCurrent(audio.currentTime);
      setTotal(audio.duration);
    }
    
    const setTime = () => {
      setCurrent(audio.currentTime);
    }

    audio.addEventListener("loadeddata", setInitTime);
    audio.addEventListener("timeupdate", setTime)

    playing ? audio.play() : audio.pause();

    return () => {
      audio.removeEventListener("loadeddata", () => setInitTime);
      audio.removeEventListener("timeupdate", () => setTime);
    }
  })

  return (
    <>
    <div id="music-player-container">
      <div id="currently-playing">
        <span>{currentSong.name}</span>
        <span style={{ color: "deeppink" }}>{getTime(current)} : {getTime(total)}</span>
        <div id="scrubber">
          <div id="skip-buttons">
            <button
              onClick={e => setCurrentSong({ ...songs[currentSong.index - 1], index: currentSong.index - 1})}
              disabled={currentSong.index === 0}>
              <i className="fa fa-fast-backward"/></button>
            <button
              onClick={e => setCurrentSong({ ...songs[currentSong.index + 1], index: currentSong.index + 1 })}
              disabled={currentSong.index === lastIndex}>
              <i className="fa fa-fast-forward" /></button>
          </div>
          <div id="draggable" style={{ left: `${(current / total * 100) - 1}%` }}></div>
          <div id="elapsed" style={{ width: `${current / total * 100}%` }} />
        </div>
      </div>
      <audio id="player" controls ref={player}
        className="hidden"
        src={currentSong.song_url}
        >
        <source src={currentSong.song_url} type="audio/mp3" />
      </audio>
      <button onClick={(e) => {
        e.preventDefault();
        setPlaying(!playing);
      }} id="play-pause-button">
        <i className={playing ? "fa fa-pause" : "fa fa-play"} />
      </button>
    </div>
    </>
  )
}