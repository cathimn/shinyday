import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';

import { baseUrl } from '../config';

export default ({ artistId, profile }) => {
  const { session, setShowModal } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false)
  const [followStatus, setFollowStatus] = useState(false);
  const [showCheck, setShowCheck] = useState(profile);

  const follow = async () => {
    if (!session.token) {
      setShowModal(true);
      return;
    }

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
    async function checkFollow() {
      if (session.token) {
        const response = await fetch(`${baseUrl}/follows/id/${artistId}`, {
          headers: { Authorization: `Bearer ${session.token}` },
        })

        if (response.ok) {
          let res = await response.json();
          setFollowStatus(res.following);
        }
      } else {
        setFollowStatus(false);
      }
      setLoaded(true)
    }

    checkFollow();
  }, [artistId, session.token])

  if (!loaded) {
    return null;
  }

  if (profile) {
    return (
      <>
        <button
          onMouseOver={e => setShowCheck(false)}
          onMouseLeave={e => setShowCheck(true)}
          className={followStatus ? "follow-button following profile" : "follow-button profile"}
          onClick={followStatus ? unfollow : follow}>
          {showCheck && followStatus ? <i className="fa fa-check"/> : null}
        </button>
      </>
    )
  } else {
    return (
      <>
      <button
        className={followStatus ? "follow-button following" : "follow-button"}
        onClick={followStatus ? unfollow : follow}>
      </button>
      </>
    )
  }

}
