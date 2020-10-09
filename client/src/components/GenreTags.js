import React, { useEffect, useState } from 'react';
import { baseUrl } from '../config';
import AlbumCard from './AlbumCard';

export default () => {
  const genres = [
    { id: 0, genre: "all" },
    { id: 1, genre: "rock" },
    { id: 2, genre: "pop" },
    { id: 3, genre: "electronic" },
    { id: 4, genre: "metal" },
    { id: 5, genre: "alternative" },
    { id: 6, genre: "hip-hop/rap" },
    { id: 7, genre: "punk" },
  ];

  const [selected, setSelected] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${baseUrl}/music/genre=${selected}/page=${page}`)
      if (response.ok) {
        const res = await response.json();
        setAlbums([...res.albums]);
        console.log(res.end)
        setLastPage(res.end);
      } else {
        setAlbums([]);
      }
    }
    fetchData();
  }, [selected, page])

  useEffect(() => {
    setPage(0);
  }, [selected])
  return (
    <>
    <div className="main-section">
      <h3 className="gray main-header">discover by genre</h3>
    </div>
    <div id="genre-gradient">
      <div id="pink1"></div>
      <div id="pink2"></div>
      <div id="pink3"></div>
      <div id="genre-buttons">
        <div className="button-row">
          {genres.map(genre =>
            <button
              onClick={e => setSelected(genre.id)}
              className={
                selected === genre.genre
                ? "genre-button selected"
                : "genre-button"} >{genre.genre}</button>)}
        </div>
        <div className="button-row">
          <button className="genre-button selected">latest</button>
        </div>
        <div className="button-row">
          <button className="genre-button selected">digital</button>
        </div>
      </div>
    </div>
    <div className="main-section">
      <div id="genre-albums" className="main-section__container">
        {albums.map(album => <AlbumCard album={album} />)}
      </div>
      {page > 0 && <button onClick={e => setPage(page - 1)}>PREV PAGE</button>}
      {!lastPage && <button onClick={e => setPage(page + 1)}>NEXT PAGE</button>}
    </div>
    </>
  );
}
