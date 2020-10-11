import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { baseUrl } from '../config';

const AlbumCard = ({ album }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link to={`/${album.artist.url}/${album.url}`}>
      <div className="small-album-card" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
        <img src={album.cover_url} className="small-album-card__image" alt="album cover" />
        <div className={hover ? "fade-in-play" : "hidden-play"}>
          <div className="fade-in-play-button">
            <i className="fa fa-play"/>
          </div>
        </div>
        <div className="small-album-card__blurb">
          <span className="small-album-card__name">{album.name}<br />by {album.artist.artist_name}</span>
          <span className="gray">{album.genre.genre}</span>
          <p>{album.description}</p>
        </div>
      </div>
    </Link>
  );
}


export default () => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    async function fetchLatest() {
      const response = await fetch(`${baseUrl}/music/curated`);
      if (response.ok) {
        const res = await response.json();
        setLatest([...res]);
      }
    }

    fetchLatest();
  }, [])

  return (
    <div className="main-section">
      <h3 className="gray main-header">new and notable</h3>
      <div className="main-section__container">
        {latest.map(album => <AlbumCard key={album.url} album={album} />)}
      </div>
    </div>
  );
}
