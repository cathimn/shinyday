import React from 'react';
import { useParams } from 'react-router-dom'

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

export default () => {
    const { artist, album } = useParams();
    return (
        <>
        <div className="albumpage-container">
            <div className="albumpage__header">
                sad cat
            </div>
            <div className="albumpage__main">
                <div className="albumpage__main--left">
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
                <div className="albumpage__main--right">
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