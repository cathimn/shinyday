import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';

import { baseUrl } from '../config';

export default ({ artistId }) => {
  const { session, setShowModal } = useContext(AppContext);
  const [loaded, setLoaded] = useState(false)
  const [followStatus, setFollowStatus] = useState(false);

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
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`
          },
        })

        if (response.ok) {
          let res = await response.json();
          setFollowStatus(res.following);
        }
      }
      setLoaded(true)
    }

    checkFollow();
  }, [artistId, session.token])

  if (!loaded) {
      return null
  }

  return (
    <>
    <button
      className={followStatus ? "follow-button following" : "follow-button"}
      onClick={followStatus ? unfollow : follow}>
    </button>
    </>
  )
}
