import React from 'react';

import { baseUrl } from '../config';

export default ({ username, artistId, followStatus}) => {
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
