import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../config';

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

  const [currentGenre, setCurrentGenre] = useState({ id: 0, genre: "all" });
  const [albums, setAlbums] = useState([]);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${baseUrl}/music/genre=${currentGenre.id}/page=${page}`)
      if (response.ok) {
        const res = await response.json();
        setAlbums([...res.albums]);
        setLastPage(res.end);
        setPages(Array.from({ length: res.total }, (_, i) => i + 1));
      } else {
        setAlbums([]);
      }
    }
    fetchData();
  }, [currentGenre, page])

  useEffect(() => {
    setPage(0);
  }, [currentGenre])

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
              key={genre.id}
              onClick={e => setCurrentGenre({ id: genre.id, genre: genre.genre })}
              className={
                currentGenre.genre === genre.genre
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
        {albums.map(album => 
          <Link key={album.url} to={`/${album.artist.url}/${album.url}`}>
            <div className="small-album-card" style={{ backgroundColor: "transparent", fontSize: "12px" }}>
              <img src={album.cover_url} className="small-album-card__image" alt="album cover" />
              <span className="small-album-card__name">{album.name}</span>
              <span>{album.artist.artist_name}</span>
              <span className="gray">{album.genre.genre}</span>
            </div>
          </Link>
          )}
      </div>
        <div id="page-buttons">
          <button disabled={page === 0} onClick={e => setPage(page - 1)}>previous</button>
          {pages.map(pageNum =>
            <button className={pageNum - 1 === page ? "current-page" : null} onClick={e => setPage(pageNum - 1)}>{pageNum}</button>)}
          <button disabled={lastPage} onClick={e => setPage(page + 1)}>next</button>
        </div>
    </div>
    <div className="divider"></div>
    </>
  );
}
