import React, { useEffect, useRef } from 'react';

export default ({ currentSongUrl, currentSongName }) => {
    const player = useRef(null);

    useEffect(() => {
        load();
    }, [currentSongUrl, currentSongName])

    const load = () => {
        player.current.load();
    }

    const play = () => {
        player.current.play();
    }

    return (
        <div className="ap--musicplayer">
            <span>{currentSongName}</span>
            <div className='player-wrapper'>
                <audio controls ref={player}>
                    <source src={currentSongUrl} type="audio/mp3" />
                </audio>
            </div>
            <button onClick={play}>PLAY</button>
        </div>
    )
}
