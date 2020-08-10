import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { baseUrl, bucketUrl } from './config';

import Player from './components/Player';
import ArtistLeft from './components/ArtistLeft';
import Discography from './components/Discography';

const FollowButton = ({ username, artistId, followStatus}) => {


    const follow = async (username, artistId) => {
        await fetch(`${baseUrl}/follows/new`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "artist_id": artistId
            })
        })
        window.location.reload(false);
    }

    const unfollow = async (username, artistId) => {
        await fetch(`${baseUrl}/follows`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "artist_id": artistId
            })
        })
        window.location.reload(false);
    }

    if (followStatus) {
        return (
            <button className="follow-button" onClick={() => unfollow(username, artistId)}>Following</button>
        )
    } else {
        return (
            <button className="follow-button" onClick={() => follow(username, artistId)}>Follow</button>
        )
    }

}

export default ({ type, username }) => {
    const { artistTerm, albumTerm } = useParams();
    const [artistId, setArtistId] = useState();
    const [artistName, setArtistName] = useState();
    const [albumName, setAlbumName] = useState();
    const [disc, setDisc] = useState();
    const [followStatus, setFollowStatus] = useState(false);

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

    const checkFollow = async (artistId, username) => {
        const response = await fetch(`${baseUrl}/follows/amfollowing`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "artist_id": artistId, username })
        })

        if (response.ok) {
            let res = await response.json();
            if (res) {
                setFollowStatus(true);
            }
        }
    }

    useEffect(() => {
        checkArtist(artistTerm);
    }, [])

    useEffect(() => {
        if (artistId) {
            requestDiscography(artistId);
        }
    }, [artistId])

    useEffect(() => {
        if (disc) {
            const current = disc.filter(ele => {
                return ele.toLowerCase().replace(/[\s|\W]/gm, "") === albumTerm;
            })
            setAlbumName(current[0])
        }
    }, [disc])

    useEffect(() => {
        if (artistId && username) {
            checkFollow(artistId, username);
        }
    }, [artistId, username])

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
                            followStatus={followStatus}
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
