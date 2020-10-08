import React from 'react';

import Header from './components/Header';
import Banner from './components/Banner';
import LatestAlbums from './components/LatestAlbums';
import GenreTags from './components/GenreTags';

export default () => {

  return (
    <>
      {/* <Header /> */}
      <Banner />
      <div className="divider" />
      <LatestAlbums />
      <div className="divider" />
      <GenreTags />
      <div className="divider" />
    </>
  );
};
