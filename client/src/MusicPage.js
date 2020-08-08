import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { baseUrl } from './config';

import PlayerLeft from './components/Player';

const ArtistLeft = () => {

    return (
        <>
            <div>
                discography for the artist
            </div>
        </>
    );
}

export default ({ type }) => {
    const { artistTerm, albumTerm } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [validPath, setValidPath] = useState(false);
    const [artistId, setArtistId] = useState();
    const [artistName, setArtistName] = useState();
    const [disc, setDisc] = useState();

    const checkArtist = async (term) => {
        const response = await fetch(`${baseUrl}/music/${artistTerm}`);
        if (response.ok) {
            const res = await response.json();
            res ? setValidPath(true) : setValidPath(false);
            // console.log(res[0].id)
            setArtistId(res[0].id)
            setArtistName(res[0].name)
        }
    }

    const requestDiscography = async (artistId) => {
        const response = await fetch(`${baseUrl}/music/discography/${artistId}`);
        if (response.ok) {
            const res = await response.json();
            // console.log(res)
            setDisc(res);
        }
    }

    useEffect(() => {
        checkArtist(artistTerm);
    }, [])

    useEffect(() => {
        requestDiscography(artistId)
    }, [artistId])

    if (!validPath && loaded) {
        // return <TheEnd />;
    }

    return (
        <>
        <div className="musicpage-container">
            <div className="musicpage__header">
                sad cat
            </div>
            <div className="musicpage__main">
                <div className="musicpage__main--left">
                    {(type === 'album')
                        ? <PlayerLeft artist={artistTerm} album={albumTerm}/>
                        : <ArtistLeft />}
                </div>
                <div className="musicpage__main--right">
                    <div className="ap-avatar">artist pic</div>
                        <h3>{artistName}</h3>
                    <button className="follow-button">FOLLOW</button>
                    <div>bio</div>
                    <div>
                        discography
                        <ul>
                            {disc}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="divider"/>
        </>
    )
}
