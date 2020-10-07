import React, { useEffect, useRef, useState } from 'react';

export default ({ currentSong }) => {
  const player = useRef(null);

  const [duration, setDuration] = useState();

  useEffect(() => {
    load();
    setDuration(player.duration)
  }, [currentSong])

  const load = () => {
    player.current.load();
  }

  const play = () => {

  }

  return (
    <div className="ap--musicplayer">
      <div id="currently-playing">
        currently playing:<br/>{currentSong.name}
      </div>
      <div className='player-wrapper'>
        <audio controls ref={player}>
          <source src={currentSong.song_url} type="audio/mp3" />
        </audio>
      </div>
      <div className="player-wrapper">
        {/* <button classname="play-button" onClick={play}>PLAY</button> */}
      </div>
    </div>
  )
}
