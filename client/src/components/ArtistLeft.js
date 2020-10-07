import React from 'react';
import { Link } from 'react-router-dom';

import { bucketUrl } from '../config';

export default ({ discography, artist }) => (
  <div className="full-discography">
    {discography.map(album => (
      <div key={album.id} className="album-card">
          <Link to={`/${artist}/${album.url}`}>
          <img src={`${bucketUrl}/artists/${artist}/${album.url}/art.jpg`}
              alt="album art"
              className="large-cover" />
          <span className="album-card__name">
              {album.name}
          </span>
          </Link>
      </div>))
    }
  </div>
);
