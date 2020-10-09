import React, { useEffect, useState } from 'react';

import { baseUrl } from '../config';

import AlbumCard from './AlbumCard'; 

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
