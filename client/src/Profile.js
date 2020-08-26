import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

import { baseUrl, bucketUrl } from './config';

import FollowButton from './components/FollowButton'

const FollowCards = ({artistNames, artistIds, loggedInUser}) => {
    const makeCards = (artistNames, artistIds) => {
        const temp = [];
        for(let i = 0; i < artistIds.length; i++) {
            temp.push(
                <div className="follow-card">
                    <img src={`${bucketUrl}/artists/${artistNames[i].toLowerCase().replace(/[\s|\W]/gm,"")}/avatar.jpg`}
                        alt="artist art"/>
                    <div className="follow-card--blurb">
                        <Link to={`/${artistNames[i].toLowerCase().replace(/[\s|\W]/gm,"")}`}>
                            {artistNames[i]}
                        </Link>
                        <div className="follow-card__button">
                            <FollowButton  username={loggedInUser} artistId={artistIds[i]}/>
                        </div>
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
    const avatarRef = useRef();
    const avatarFormRef = useRef();
    const { username } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [allowEditMode, setAllowEditMode] = useState(false);
    const [following, setFollowing] = useState([]);
    const [artistNames, setArtistNames] = useState([]);
    const [artistIds, setArtistIds] = useState([]);

    useEffect(() => {
        if (username === loggedInUser) {
            setAllowEditMode(true);
        }
    }, [username, loggedInUser])

    useEffect(() => {
        const fetchFollow = async (username) => {
            const response = await fetch(`${baseUrl}/follows/${username}`);

            if (response.ok) {
                const res = await response.json();
                setFollowing(res);
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

    const changeEditMode = () => {
        setEditMode(!editMode);
    }

    const updateAvatar = async () => {
        avatarRef.current.click();
    }

    const submitAvatar = async () => {
        // console.log(avatarRef)
        avatarFormRef.current.submit();
    }

    return (
        <>
        <div className="profile__header" />
        <div className="profile-container">
            <div className="profile__fan-bio">
                <img src={`${bucketUrl}/users/${username}.png`} alt="avatar" width="150px"/>
                {/* { editMode ? <button onClick={updateAvatar} id="change-avatar">+</button> : null} */}
                <h2>{username}</h2>
                <div>
                    {/* { allowEditMode && !editMode ? <button onClick={changeEditMode}>edit profile</button> : null}
                    { editMode ? <button onClick={submitAvatar}>finish</button> : null} */}
                </div>
                {/* <form className="hidden" action={`${baseUrl}/upload/users/${username}`} ref={avatarFormRef}>
                    <input type="file" id="avatar" className="hidden" name="avatar" accept="image/png" ref={avatarRef} />
                </form> */}
            </div>
            <div className="profile__tabs">
                {/* <div>
                    collection
                </div> */}
                <div>
                    following <span>{artistNames.length}</span>
                </div>
            </div>
            <div className="profile__collection-box">

            </div>
            <div className="profile__following-box">
                <FollowCards artistNames={artistNames} artistIds={artistIds} loggedInUser={loggedInUser}/>
            </div>
        </div>
        </>
    )
}
