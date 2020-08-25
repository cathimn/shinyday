import React, { useState, useEffect } from 'react';

import { baseUrl } from '../config';

export default ({ username, artistId }) => {
    const [loaded, setLoaded] = useState(false)
    const [followStatus, setFollowStatus] = useState(false);

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
        setLoaded(true)
    }

    const follow = async (username, artistId) => {
        await fetch(`${baseUrl}/follows/new`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "artist_id": artistId
            })
        })
        setFollowStatus(true)
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
        setFollowStatus(false)
    }

    useEffect(() => {
        if (artistId && username) {
            checkFollow(artistId, username);
        }
    }, [artistId, username])

    if (!loaded) {
        return null
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
