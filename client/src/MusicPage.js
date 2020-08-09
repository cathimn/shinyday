import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { baseUrl, bucketUrl } from './config';

import Player from './components/Player';

const ArtistLeft = () => {

    return (
        <>
            <div>
                discography for the artist
            </div>
        </>
    );
}

const Discography = ({disc, artistTerm}) => {
    return (
        <ul>
            {disc
                ? disc.map(ele => <li key={ele}>{ele}</li>)
                : null
            }
        </ul>
    )
}

export default ({ type }) => {
    const { artistTerm, albumTerm } = useParams();
    const [artistId, setArtistId] = useState();
    const [artistName, setArtistName] = useState();
    const [albumName, setAlbumName] = useState();
    const [disc, setDisc] = useState();

    const checkArtist = async (term) => {
        const response = await fetch(`${baseUrl}/music/${artistTerm}`);
        if (response.ok) {
            const res = await response.json();
            setArtistId(res.id)
            setArtistName(res.artist_name)
        }
    }

    const requestDiscography = async (artistId) => {
        const response = await fetch(`${baseUrl}/music/discography/${artistId}`);
        if (response.ok) {
            const res = await response.json();
            setDisc(res);
        }
    }

    useEffect(() => {
        checkArtist(artistTerm);
    }, [])

    useEffect(() => {
        if (artistId) requestDiscography(artistId)
    }, [artistId])

    useEffect(() => {
        if (disc) {
            const current = disc.filter(ele => {
                return ele.toLowerCase().replace(/[\s|\W]/gm, "") === albumTerm;
            })
            setAlbumName(current[0])
        }
    }, [disc])

    return (
        <>
        <div className="musicpage-container">
            <div className="musicpage__header">
                    <img src={`${bucketUrl}/artists/${artistTerm}/header.jpg`}
                        className="large-header"
                        alt="header" />
            </div>
            <div className="musicpage__main">
                <div className="musicpage__main--left">
                    {(type === 'album')
                        ? <Player
                            artist={artistTerm}
                            album={albumTerm}
                            artistName={artistName}
                            albumName={albumName} />
                        : <ArtistLeft />}
                </div>
                <div className="musicpage__main--right">
                    <div className="ap-avatar">artist pic</div>
                        <h3>{artistName}</h3>
                    <button className="follow-button">Follow</button>
                    <div>bio</div>
                    <div>
                        <Discography
                            disc={disc}
                            artistTerm={artistTerm}
                            />
                    </div>
                </div>
            </div>
        </div>
        <div className="divider"/>
        </>
    )
}
