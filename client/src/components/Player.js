import React, { useState, useEffect } from 'react';

import MusicPlayer from './MusicPlayer';
import Tracklist from './Tracklist';

import { baseUrl, bucketUrl } from '../config';

export default ({ artist, album }) => {
    const [songlistUrls, setSonglistUrls] = useState([]);
    const [songlistNames, setSonglistNames] = useState([]);
    const [currentSongIdx, setCurrentSongIdx] = useState(0);
    const [currentSongName, setCurrentSongName] = useState('');
    const [currentSongUrl, setCurrentSongUrl] = useState('');

    const requestSongUrls = async (artist, album) => {
        const response = await fetch(`${baseUrl}/music/songfiles`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "prefix": `${artist}/${album}` })
        })
        if (response.ok) {
            const res = await response.json();
            const translateToUrls = res.map(ele => `${bucketUrl}/${ele}`)
            setSonglistUrls(translateToUrls);
            setCurrentSongUrl(translateToUrls[currentSongIdx]);
        }
    }

    const requestSongNames = async (album) => {
        const response = await fetch(`${baseUrl}/music/songnames`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "album": album })
        });

        if (response.ok) {
            const res = await response.json();
            setSonglistNames(res);
            setCurrentSongName(res[0].name)
        }
    }

    useEffect(() => {
        requestSongUrls(artist, album);
        requestSongNames(album);
    }, [artist, album])

    return (
        <>
            <div className="ap--player-songs">
                <MusicPlayer
                    currentSongUrl={currentSongUrl}
                    currentSongName={currentSongName} />
                <Tracklist
                    setCurrentSongIdx={setCurrentSongIdx}
                    setCurrentSongName={setCurrentSongName}
                    setCurrentSongUrl={setCurrentSongUrl}
                    songlistNames={songlistNames}
                    songlistUrls={songlistUrls} />
            </div>
            <div className="ap--art-fans">
                <div className="ap-art asdf">
                    todo: album art
                            </div>
                <div>
                    todo: fan counter or display fans as grid
                            </div>
            </div>
        </>
    );
}