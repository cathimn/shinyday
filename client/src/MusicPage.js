import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom'

const MusicPlayer = () => {

    return (
        <div className="ap--musicplayer">
            <h1>current song title</h1>
            todo: music player
        </div>
    )
}

const Songlist = () => {
    return (
        <div className="ap--songlist">
            <ul>
                <li>tracks listed out</li>
                <li>tracks listed out</li>
                <li>tracks listed out</li>
                <li>tracks listed out</li>
                <li>tracks listed out</li>
            </ul>
        </div>
    )
}

export default ({ type }) => {
    const [validPath, setValidPath] = useState(false);

    if (type === "artist") {
        // check if artist in params exists, set valid path to true
        // find all albums
        // render albums display on "musicpage__main--left"
    } else if (type === "album") {
        // fetch if album with artist name exists in db
    }


    // if (!validPath) {
    //     return <Redirect to="/404"/>
    // }
    return (
        <>
        <div className="musicpage-container">
            <div className="musicpage__header">
                sad cat
            </div>
            <div className="musicpage__main">
                <div className="musicpage__main--left">
                    <div className="ap--player-songs">
                        <MusicPlayer />
                        <Songlist />
                    </div>
                    <div className="ap--art-fans">
                        <div className="ap-art asdf">
                            todo: album art
                        </div>
                        <div>
                            todo: fan counter or display fans as grid
                        </div>
                    </div>
                </div>
                <div className="musicpage__main--right">
                    <div className="ap-avatar">artist pic</div>
                    artist name
                    <button className="follow-button">FOLLOW</button>
                    <div>small blurb idk wat yet</div>
                    <div>
                        discography
                        <ul>
                            <li>album</li>
                            <li>album</li>
                            <li>album</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="divider"/>
        </>
    )
}
