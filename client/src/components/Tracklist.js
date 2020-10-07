import React, { useState, useEffect } from 'react'


export default ({ setCurrentSong, songs }) => {
    const updateCurrentSong = (e) => {
      e.preventDefault();
      setCurrentSong(songs[e.target.value]);
    }

    return (
      <div className="ap--songlist">
          <h3>tracklist</h3>
          {songs.map((song, index) =>
            <div key={song.id} className="track-item">
              <span className="track-item-number">{song.track_num}</span>
              <button value={index} className="track-item-name" onClick={updateCurrentSong}>
                <span className="mini-play-button">▶</span> {song.name}
              </button>
            </div>)}
      </div>
    )
}
