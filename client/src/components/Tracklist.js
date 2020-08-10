import React, { useState, useEffect } from 'react'


export default ({ setCurrentSongIdx, setCurrentSongUrl, setCurrentSongName, songlistUrls, songlistNames }) => {
    const [trackNums, setTrackNums] = useState([]);
    const [names, setNames] = useState([]);

    const useableArrays = (songlistNames) => {
        let tempNums = [];
        let tempNames = [];
        songlistNames.forEach(ele => {
            tempNums.push(ele.track_num);
            tempNames.push(ele.name);
        })
        setTrackNums(tempNums);
        setNames(tempNames);
    }

    useEffect(() => {
        useableArrays(songlistNames);
    }, [songlistNames])

    const updateCurrentSong = (e) => {
        setCurrentSongIdx(e.target.value);
        setCurrentSongName(songlistNames[e.target.value].name);
        setCurrentSongUrl(songlistUrls[e.target.value])
    }

    const renderLi = (trackNums, names) => {
        let tracklist = [];
        for (let i = 0; i < names.length; i++) {
            tracklist.push(
                <div key={trackNums[i]} className="track-item">
                    <span className="track-item-number">
                        {trackNums[i]}
                    </span>
                    <button value={i} onClick={updateCurrentSong} className="track-item-name">
                        <span class="mini-play-button">▶</span>{names[i]}
                    </button>
                </div>
            );
        }
        return tracklist;
    }

    return (
        <div className="ap--songlist">
            <h3>tracklist</h3>
            {renderLi(trackNums, names)}
        </div>
    )
}
