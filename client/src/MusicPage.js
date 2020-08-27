import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom'

import { baseUrl, bucketUrl, toLowerNoSpecial } from './config';

import Player from './components/Player';
import ArtistLeft from './components/ArtistLeft';
import Discography from './components/Discography';
import FollowButton from './components/FollowButton';

export default ({ type, username }) => {
    const location = useLocation();
    const { artistTerm, albumTerm } = useParams();
    const [ albumName, setAlbumName ] = useState();
    const [ artistId, setArtistId ] = useState();
    const [ artistName, setArtistName ] = useState();
    const [ disc, setDisc ] = useState();

    useEffect(() => {
        const checkArtist = async (term) => {
            const response = await fetch(`${baseUrl}/music/${artistTerm}`);
            if (response.ok) {
                const res = await response.json();
                setArtistId(res.id)
                setArtistName(res.artist_name)
            } else {
                setArtistId(0);
            }
        }
        checkArtist(artistTerm);
    }, [location, artistTerm])

    useEffect(() => {
        const requestDiscography = async (artistId) => {
            const response = await fetch(`${baseUrl}/music/discography/${artistId}`);
            if (response.ok) {
                const res = await response.json();
                setDisc(res);
            }
        }

        requestDiscography(artistId);
    }, [artistId])

    useEffect(() => {
        const getCurrentAlbum = (disc, albumTerm) => {
            const current = disc.filter(ele => toLowerNoSpecial(ele) === albumTerm)[0];
            setAlbumName(current)
        }

        if (disc) getCurrentAlbum(disc, albumTerm);
    }, [disc, albumTerm])

    if (artistId === 0) {
        return <Redirect to='/404'/>
    }

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
                            albumName={albumName}
                            />
                        : <ArtistLeft
                            artist={artistTerm}
                            disc={disc} />}
                </div>
                <div className="musicpage__main--right">
                    <div className="ap-avatar">
                        <img src={`${bucketUrl}/artists/${artistTerm}/avatar.jpg`}
                            className="artist-avatar"
                            alt="artist pic" />
                    </div>
                        <h3>{artistName}</h3>
                        <FollowButton
                            username={username}
                            artistId={artistId} />
                    <div>
                        {(type === 'artist')
                            ? null
                            : <Discography
                                disc={disc}
                                artistTerm={artistTerm}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="divider"/>
        </>
    )
}
