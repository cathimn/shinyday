import React, { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom'

import { baseUrl } from './config';

import Player from './components/Player';
import ArtistLeft from './components/ArtistLeft';
import FollowButton from './components/FollowButton';

export default ({ type }) => {
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
    description: null,
    avatarUrl: null,
    bannerUrl: null });
  const [ loaded, setLoaded ] = useState(null);
  const [ discography, setDiscography ] = useState([]);
  const [invalidArtist, setInvalidArtist] = useState(null);
  const [invalidAlbum, setInvalidAlbum] = useState(null);

  useEffect(() => {
    async function fetchData () {
      const response = await fetch(`${baseUrl}/music/${artistTerm}`);
      if (response.ok) {
        const res = await response.json();
        setArtist({
          id: res.id,
          url: res.url,
          artistName: res.artist_name,
          description: res.description,
          avatarUrl: res.avatar_url,
          bannerUrl: res.banner_url
        });
        setDiscography([...res.albums]);

        if (type === "album") {
          const response = await fetch(`${baseUrl}/music/${artistTerm}/${albumTerm}`);
          if (response.ok) {
            const res = await response.json();
            setAlbum({
              id: res.id,
              artistId: res.artist_id,
              coverUrl: res.cover_url,
              description: res.description,
              name: res.name,
              songs: [...res.songs]
            })
          } else {
            setInvalidAlbum(true);
          }
        }
      } else {
        setInvalidArtist(true);
      }
      setLoaded(true);
    }
    setLoaded(false);
    fetchData();
  }, [artistTerm, albumTerm, type])

  if ((invalidArtist || invalidAlbum) && loaded) {
    return <Redirect to='/404'/>
  }

  if (!loaded) {
    return null;
  }

  return (
    <>
    <div id="musicpage-container">
      <img
        id="large-header"
        src={artist.bannerUrl}
        alt="header" />
      <div id="musicpage__main">
        <div id="musicpage__main--left">
          {type === "artist" &&
          <ArtistLeft
            discography={discography}
            artist={artist.url} />}
          {type === "album" &&
          <Player
            artist={artist}
            album={album}/>}
        </div>
        <div id="musicpage__main--right">
          <img src={artist.avatarUrl}
            className="artist-portrait"
            alt="artist pic" />
          <h3 style={{ margin: "10px 0"}}>{artist.artistName}</h3>
          <FollowButton artistId={artist.id} />
          <p className="description">{artist.description}</p>
          {type === "album" &&
          <>
            {discography.map(album =>
            <div key={album.id} className="small-album">
              <Link to={`/${artist.url}/${album.url}`}>
                <img src={album.cover_url} className="small-cover" alt="album art" />
                <span className="pink">{album.name}</span>
              </Link>
            </div>)}
          </>}
        </div>
      </div>
    </div>
    <div className="divider"/>
    </>
  )
}
