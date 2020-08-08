import React, { useEffect, useRef } from 'react';

export default ({ currentSongUrl, currentSongName }) => {
    const player = useRef(null);

    useEffect(() => {
        load();
    }, [currentSongUrl, currentSongName])

    const load = () => {
        player.current.load();
    }

    return (
        <div className="ap--musicplayer">
            <h3>{currentSongName}</h3>
            <div className='player-wrapper'>
                <audio controls ref={player}>
                    <source src={currentSongUrl} type="audio/mp3" />
                </audio>
            </div>
        </div>
    )
}