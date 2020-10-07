import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import MusicPlayer from './MusicPlayer';
import Tracklist from './Tracklist';

import { baseUrl, bucketUrl } from '../config';

export default ({ artist, album }) => {
  // const [songlistUrls, setSonglistUrls] = useState([]);
  // const [songlistNames, setSonglistNames] = useState([]);
  const [currentSong, setCurrentSong] = useState({
    index: 0,
    name: null,
    songUrl: null,
  });

  useEffect(() => {
    setCurrentSong(album.songs[0])
  }, [artist, album])

  // useEffect(() => {
  //     setCurrentSongUrl(songlistUrls[currentSongIdx]);
  // }, [songlistUrls, currentSongIdx])

  return (
    <>
      <div className="ap--player-songs">
        <div className="current-album">
          <h2>{album.name}</h2>
          <div>
            by&nbsp;<Link to={`/${artist.url}`}>{artist.artistName}</Link>
          </div>
        </div>
        <MusicPlayer currentSong={currentSong} />
        <Tracklist setCurrentSong={setCurrentSong} songs={album.songs} />
      </div>
      <div className="ap--art-fans">
        <div className="ap-art asdf">
          <img src={album.coverUrl}
              className="large-cover"
              alt="album art" />
        </div>
      </div>
    </>
  );
}
