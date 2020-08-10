import React, { useEffect, useRef, useState } from 'react';

export default ({ currentSongUrl, currentSongName }) => {
    const player = useRef(null);

    const [duration, setDuration] = useState();

    useEffect(() => {
        load();
        setDuration(player.duration)
    }, [currentSongUrl, currentSongName])

    const load = () => {
        player.current.load();
    }

    const play = () => {

    }

    return (
        <div className="ap--musicplayer">
            <div id="currently-playing">
                currently playing:<br/>{currentSongName}
            </div>
            <div className='player-wrapper'>
                <audio controls ref={player}>
                    <source src={currentSongUrl} type="audio/mp3" />
                </audio>
            </div>
            <div className="player-wrapper">
                {/* <button classname="play-button" onClick={play}>PLAY</button> */}
            </div>
        </div>
    )
}
