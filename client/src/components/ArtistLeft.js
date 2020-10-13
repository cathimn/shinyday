import React from 'react';
import { Link } from 'react-router-dom';

export default ({ discography, artist }) => (
  <div id="full-discography">
    {discography.map(album =>
      <div key={album.id} className="album-card">
          <Link to={`/${artist}/${album.url}`}>
          <img
            src={album.cover_url}
            alt="album art"
            className="large-cover" />
          <span className="pink album-name">
            {album.name}
          </span><br/>
          <span style={{ fontSize: "12px" }}>
            {new Date(album.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
          </span>
          </Link>
      </div>)}
  </div>
);
