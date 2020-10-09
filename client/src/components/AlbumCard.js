import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default ({ album }) => {
  const [button, setButton] = useState(false);

  return (
    <Link to={`/${album.artist.url}/${album.url}`}>
      <div className="small-album-card" onMouseOver={e => setButton(true)} onMouseLeave={e => setButton(false)}>
        <img src={album.cover_url} className="small-album-card__image" />
        <div className="small-album-card__blurb">
          <span className="small-album-card__name">{album.name}<br />by {album.artist.artist_name}</span>
          <span className="gray">{album.genre.genre}</span>
          <p>{album.description}</p>
        </div>
      </div>
    </Link>
  );
}
