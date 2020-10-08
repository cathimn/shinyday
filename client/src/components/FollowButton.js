import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';

import { baseUrl } from '../config';

export default ({ artistId }) => {
  const { session } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false)
  const [followStatus, setFollowStatus] = useState(false);

  const checkFollow = async () => {
    const response = await fetch(`${baseUrl}/follows/id/${artistId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}` },
    })

    if (response.ok) {
      let res = await response.json();
      setFollowStatus(res.following)
    }
    setLoaded(true)
  }

  const follow = async () => {
    const response = await fetch(`${baseUrl}/follows/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}` },
      body: JSON.stringify({
        "artistId": artistId
      })
    })
    const res = await response.json()
    setFollowStatus(res.following)
  }

  const unfollow = async () => {
    const response = await fetch(`${baseUrl}/follows/`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}` },
      body: JSON.stringify({
        "artistId": artistId
      })
    })
    const res = await response.json()
    setFollowStatus(res.following)
  }

  useEffect(() => {
    if (session.token) checkFollow();
  }, [session.token])

  if (!loaded) {
      return null
  }
  

  return (
    <button
      className={followStatus ? "follow-button following" : "follow-button"}
      onClick={followStatus ? unfollow : follow}>
    </button>
  )
  // if (followStatus) {
  //     return (
  //         <button className="follow-button following"
  //             onMouseEnter={() => setFollowingButton(false)}
  //             onMouseLeave={() => setFollowingButton(true)}
  //             onClick={() => unfollow(username, artistId)}>
  //             { followingButton ? "Following" : "Unfollow" }
  //         </button>
  //     )
  // } else {
  //     return (
  //         <button className="follow-button" onClick={() => follow(username, artistId)}>Follow</button>
  //     )
  // }
}
