import React, { useState } from 'react';

export default () => {
    const initialTrack = (
        <input key="1" placeholder="track name"></input>
    )

    let [trackNum, setTrackNum] = useState(2);

    const newTrack = (
        <div key={trackNum}>
            <input placeholder="track name"></input>
        </div>
    )

    const [tracks, setTracks] = useState([initialTrack]);

    const addTrack = (e) => {
        e.preventDefault();
        setTracks([...tracks, newTrack])
        let newTrackNum = trackNum + 1;
        setTrackNum(newTrackNum);
    }

    const deleteTrack = (e) => {
        e.preventDefault();
        let newTracks = [...tracks];
        newTracks.pop();
        let newTrackNum = trackNum - 1;
        setTrackNum(newTrackNum)
        setTracks([...newTracks])
    }

    const TrackInputs = () => (
        (tracks && tracks.length > 0) ? tracks.map(ele => <div>{ele}</div>) : null
    );


    return (
        <div className="new-album__container">
            <h1>creating a new album</h1>
            <form>
                <input placeholder="album name"></input>
                <label>about this album:</label>
                <textarea placeholder="description (optional)"></textarea>
                <div>
                    tracks:
                    <div>
                    <button onClick={addTrack}>add more tracks</button>
                    {tracks.length > 1 ? <button onClick={deleteTrack}>remove track</button> : null}
                    </div>
                </div>
                <>
                    <TrackInputs />
                </>
                <button type="submit">submit</button>
            </form>

        </div>
    )
}
