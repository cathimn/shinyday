import React, { useState, useEffect } from 'react';

export default ({ playing, setPlaying, player, currentSong, setCurrentSong, songs, lastIndex }) => {
  const [current, setCurrent] = useState();
  const [total, setTotal] = useState();

  function getTime(time) {
    if (!isNaN(time)) {
      return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
  }

  function nextTrack() {
    setPlaying(false);
    if (currentSong.index !== lastIndex) {
      setCurrentSong({
        ...songs[currentSong.index + 1],
        index: currentSong.index + 1});
      setPlaying(true);
    }
  }

  function calcClickedTime(e) {
    const bar = document.getElementById("scrubber");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = e.pageX - barStart;
    const timePerPixel = total / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function scrub(e) {
    const player = document.getElementById("player");
    player.currentTime = calcClickedTime(e);
    
    const updateTimeOnMove = eMove => {
      player.currentTime = calcClickedTime(eMove);
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
      document.removeEventListener("mouseup", updateTimeOnMove);
    });
  }

  useEffect(() => {
    player.current.load();
  }, [player])

  useEffect(() => {
    const audio = document.getElementById("player");

    audio.loop = false;

    async function promisePlay() {
      var promise = audio.play();

      if (promise !== undefined) {
        promise.catch(error => {
          console.log(error)
        }).then(() => {
        });
      }
    }

    playing ? promisePlay() : audio.pause();
  })

  return (
    <>
    <div id="music-player-container">
      <div id="currently-playing">
        <span>{currentSong.name}</span>
        <span className="pink">{getTime(current)} : {getTime(total)}</span>
        <div id="scrubber" onMouseDown={e => scrub(e)}>
          <div id="skip-buttons">
            <button
              onClick={e => {
                if (playing) setPlaying(false);
                setCurrentSong({
                  ...songs[currentSong.index - 1],
                  index: currentSong.index - 1
                })
                setPlaying(true);
              }}
              disabled={currentSong.index === 0}>
              <i className="fa fa-fast-backward"/></button>
            <button
              onClick={e => {
                if (playing) setPlaying(false);
                setCurrentSong({
                  ...songs[currentSong.index + 1],
                  index: currentSong.index + 1
                })
                setPlaying(true);
              }}
              disabled={currentSong.index === lastIndex}>
              <i className="fa fa-fast-forward" /></button>
          </div>
          <div id="drag-container">
            <div id="draggable"
              style={{ left: `${(current / total * 100) - 2}%` }} />
          </div>
          <div id="elapsed" style={{ width: `${current / total * 100}%` }} />
        </div>
      </div>
      <audio id="player"
        ref={player}
        autoPlay={false}
        className="hidden"
        onCanPlay={e => {
          setCurrent(e.target.currentTime);
          setTotal(e.target.duration);
          e.target.click();
        }}
        onTimeUpdate={e => setCurrent(e.target.currentTime)}
        onEnded={nextTrack}
        src={currentSong.song_url}
        >
        <source src={currentSong.song_url} type="audio/mp3" />
      </audio>
      <button onClick={(e) => setPlaying(!playing)} id="play-pause-button">
        <i className={playing ? "fa fa-pause" : "fa fa-play"} />
      </button>
    </div>
    </>
  )
}
