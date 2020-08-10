import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { baseUrl, bucketUrl } from './config';

const FollowCards = ({artistNames, artistIds}) => {
    const makeCards = (artistNames, artistIds) => {
        const temp = [];
        for(let i = 0; i < artistIds.length; i++) {
            temp.push(
                <div className="follow-card">
                    <img src={`${bucketUrl}/artists/${artistNames[i].toLowerCase().replace(/[\s|\W]/gm,"")}/avatar.jpg`}
                        alt="artist art"/>
                    <div>
                        <a href={`/${artistNames[i].toLowerCase().replace(/[\s|\W]/gm,"")}`}>
                            {artistNames[i]}
                        </a>
                    </div>
                </div>
            )
        }
        return (temp)
    }

    return (
        <div className="follow-cards-container">
            {makeCards(artistNames, artistIds)}
        </div>
    )
}

export default ({ needLogin, loggedInUser, artistAccount }) => {
    const { username } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [following, setFollowing] = useState([]);
    const [artistNames, setArtistNames] = useState([]);
    const [artistIds, setArtistIds] = useState([]);

    useEffect(() => {
        if (username === loggedInUser) {
            setEditMode(true);
        }
    }, [username, loggedInUser])

    useEffect(() => {
        const fetchFollow = async (username) => {
            const response = await fetch(`${baseUrl}/follows/${username}`);

            if (response.ok) {
                const res = await response.json();
                setFollowing(res);

                console.log(res);
            }
        }

        fetchFollow(username);
    }, [username])

    useEffect(() => {
        const tempNames = [];
        const tempIds = [];
        if (following) {
            following.forEach(ele => {
                tempNames.push(ele.artist);
                tempIds.push(ele.id);
            })
        }
        setArtistNames(tempNames);
        setArtistIds(tempIds);
    }, [following])

    return (
        <>
        <div className="profile__header" />
        <div className="profile-container">
            <div className="profile__fan-bio">
                <img src={`${bucketUrl}/users/${username}.png`} alt="avatar" width="150px"/>
                <h2>{username}</h2>
            </div>
            <div className="profile__tabs">
                <div>
                    collection
                </div>
                <div>
                    following <span>{artistNames.length}</span>
                </div>
            </div>
            <div className="profile__collection-box">

            </div>
            <div className="profile__following-box">
                <FollowCards artistNames={artistNames} artistIds={artistIds}/>
            </div>
        </div>
        </>
    )
}
