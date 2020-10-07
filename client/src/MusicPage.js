import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Redirect, Link } from 'react-router-dom'

import { baseUrl, bucketUrl, toLowerNoSpecial } from './config';

import Player from './components/Player';
import ArtistLeft from './components/ArtistLeft';
import FollowButton from './components/FollowButton';

export default ({ type, username }) => {
  const location = useLocation();
  const { artistTerm, albumTerm } = useParams();

  const [ album, setAlbum ] = useState({
    id: null,
    artistId: null,
    coverUrl: null,
    description: null,
    name: null,
    songs: [], });
  const [ artist, setArtist ] = useState({
    id: null,
    url: null,
    artistName: null,
    description: null });
  const [ loaded, setLoaded ] = useState(null);
  const [ discography, setDiscography ] = useState([]);
  const [invalidArtist, setInvalidArtist] = useState(null);
  const [invalidAlbum, setInvalidAlbum] = useState(null);

  useEffect(() => {
    async function fetchData () {
      const response = await fetch(`${baseUrl}/music/${artistTerm}`);
      if (response.ok) {
        const res = await response.json();
        console.log(res)
        setArtist({
          id: res.id,
          url: res.url,
          artistName: res.artist_name,
          description: res.description,
        });
        setDiscography([...res.albums]);

        if (type === "album") {
          const response = await fetch(`${baseUrl}/music/${artistTerm}/${albumTerm}`);
          if (response.ok) {
            const res = await response.json();
            console.log(res)
            setAlbum({...res})
          } else {
            setInvalidAlbum(true);
          }
        }
      } else {
        setInvalidArtist(true);
      }
      setLoaded(true);
    }
    fetchData();
  }, [artistTerm, albumTerm])

  if ((invalidArtist || invalidAlbum) && loaded) {
    return <Redirect to='/404'/>
  }

  if (!loaded) {
    return null;
  }

  return (
    <>
    <div className="musicpage-container">
      <div className="musicpage__header">
        <img src=""
            className="large-header"
            alt="header" />
      </div>
      <div className="musicpage__main">
        <div className="musicpage__main--left">
          {type === "artist" &&
          <ArtistLeft
            discography={discography}
            artist={artist.url} />}
          {type === "album" &&
          <Player
            artist={artist}
            album={album}/>}
        </div>
        <div className="musicpage__main--right">
          <div className="ap-avatar">
            <img src=""
                className="artist-avatar"
                alt="artist pic" />
          </div>
            <h3>{artist.name}</h3>
              {/* <FollowButton
                  username={artist.url}
                  artistId={artist.id} /> */}
          { type === "album" &&
            <ul className="side-discography">
              {discography.map(album =>
                <Link to={`/${artist.url}/${album.url}`}>
                  <img src={album.coverUrl} className="side-discography__album-art" alt="album art" />
                  <li className="side-discography__album-name">{album.name}</li>
                </Link>)}
            </ul> }
        </div>
      </div>
    </div>
    <div className="divider"/>
    </>
  )
}
