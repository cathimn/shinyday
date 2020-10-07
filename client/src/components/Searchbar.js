import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl, toLowerNoSpecial } from '../config';

const AlbumResult = ({ result }) => {
  const albumName = result[0][1];
  const artistName = result[1][1];
  const albumPath = `/${toLowerNoSpecial(artistName)}/${toLowerNoSpecial(albumName)}`;

  return (
      <Link to={albumPath}>
          <div className="result-container">
              <div className="result-img-placeholder">

              </div>
              <ul className="result">
                  <li className="search-matched-term">{albumName}</li>
                  <li>by {artistName}</li>
                  <li>ALBUM</li>
              </ul>
          </div>
      </Link>
  );
};

const ArtistResult = ({result}) => {
  const artistName = result[0][1];

  return (
    <Link to={`/${toLowerNoSpecial(artistName)}`}>
        <div className="result-container">
            <div className="result-img-placeholder artist">
                
            </div>
            <ul className="result">
                <li className="search-matched-term">{artistName}</li>
                <li>ARTIST</li>
            </ul>
        </div>
    </Link>
  );
};

const Results = ({ list }) => (
  <div className="search-results">
      {Object.values(list).map(li => {
          const result = Object.entries(li)

          if (result.length > 1) {
              return <AlbumResult key={result[0][1]} result={result} />
          } else {
              return <ArtistResult key={result[0][1]} result={result} />
          }
      }
      )}
  </div>
);

export default () => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [list, setList] = useState({});

  const updateQuery = e => {
      setQuery(e.target.value);
  }

  const populateList = async (query) => {
      const response = await fetch(`${baseUrl}/search`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "query": query }),
      });

      if (response.ok) {   
          const res = await response.json();
          setList(res);
          setSearched(true)
      }
  }

  const loseFocus = e => {
      setTimeout(() => setQuery(''), 100)
  }

  useEffect(() => {
      if (query && !searched) {
          populateList(query);
      } else if (query.length === 0) {
          setList({});
      }
  }, [query, searched]);

  useEffect(() => {
      setSearched(false);
  }, [query.length])

  return (
    <>
      <div className="search-container" onBlur={loseFocus}>
        <input
            className="search"
            type="text"
            value={query}
            onChange={updateQuery}
            placeholder="search..."
            />
      </div>
      <div className="search-results-container">
          {(Object.keys(list).length > 0) ? <Results list={list} /> : null}
      </div>
    </>
  );
};
