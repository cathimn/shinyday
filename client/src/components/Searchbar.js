import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../config';

const AlbumResult = ({ album }) => (
  <Link to={`/${album.artist.url}/${album.url}`}>
    <div className="result-container">
      <img src={album.cover_url} className="result-img" alt="album art" />
      <ul className="result">
        <li className="search-matched-term">{album.name}</li>
        <li>by {album.artist.artist_name}</li>
        <li>ALBUM</li>
      </ul>
    </div>
  </Link>
);

const ArtistResult = ({ artist }) => (
  <Link to={`/${artist.url}`}>
    <div className="result-container">
      <img src={artist.avatar_url} className="result-img artist" alt="artist avatar" />
        <ul className="result">
          <li className="search-matched-term">{artist.artist_name}</li>
          <li>ARTIST</li>
        </ul>
    </div>
  </Link>
);

export default () => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [list, setList] = useState([]);

  const loseFocus = e => {
    setTimeout(() => setQuery(''), 100)
  }

  useEffect(() => {
    async function populateList() {
      const response = await fetch(`${baseUrl}/search/${query}`);

      if (response.ok) {
        const res = await response.json();
        setList(res);
        setSearched(true);
      }
    }

    if (query && !searched) {
      populateList(query);
    } else if (query.length === 0) {
      setList([]);
    }
  }, [query, searched]);

  useEffect(() => {
    setSearched(false);
  }, [query.length])

  return (
    <>
      <div className="search-container" onBlur={loseFocus}>
        <button id="search-button" disabled>
          <i className="fa fa-search" />
        </button>
        <input
          className="search"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search and discover music"
          />
      </div>
      <div className="search-results-container">
        {list.length > 0 && 
          <div className="search-results">
            {list.map(item => {
              if (item.artist) {
                return <AlbumResult key={item.url} album={item} />
              } else {
                return <ArtistResult key={item.url} artist={item} />
              }
            })}
          </div>}
      </div>
    </>
  );
};
