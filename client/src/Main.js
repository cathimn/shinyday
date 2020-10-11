import React from 'react';

import Banner from './components/Banner';
import LatestAlbums from './components/LatestAlbums';
import GenreTags from './components/GenreTags';
import { Footer } from './components/Footer';

export default () => {

  return (
    <>
      <Banner />
      <div className="divider" />
      <LatestAlbums />
      <div className="divider" />
      <GenreTags />
      <Footer />
    </>
  );
};
