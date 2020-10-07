import React from 'react';
import { Link } from 'react-router-dom';

export default ({ discography, artist }) => (
  <div className="full-discography">
    {discography.map(album => (
      <div key={album.id} className="album-card">
          <Link to={`/${artist}/${album.url}`}>
          <img src={album.cover_url}
              alt="album art"
              className="album-card__art" />
          <span className="album-card__name">
              {album.name}
          </span>
          </Link>
      </div>))
    }
  </div>
);
