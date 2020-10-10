'use strict';

const faker = require('faker');

faker.seed(4444);

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  o.description = faker.lorem.sentences(3);
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      r({ name: 'Everything\'s Gone...', artist_id: 1, genre_id: 7,
        url: "everythingsgone",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/everythingsgone/art.jpg' }),
      r({ name: 'Haumea', artist_id: 2, genre_id: 4,
        url: "haumea",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/haumea/art.jpg' }),
      r({ name: 'I Wanna Hear The Music', artist_id: 3, genre_id: 6,
        url: "iwannahearthemusic",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/iwannahearthemusic/art.jpg'}),
      r({ name: 'ELEGIAC SYMPHONY', artist_id: 4, genre_id: 5,
        url: "elegiacsymphony",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/elegiacsymphony/art.jpg'}),
      r({ name: 'lullaby', artist_id: 4, genre_id: 5,
        url: "lullaby",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/lullaby/art.jpg'}),
      r({ name: 'Metamorph', artist_id: 5, genre_id: 3,
        url: "metamorph",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/gritt/metamorph/art.jpg'}),
      r({ name: 'G.O.O.D.', artist_id: 6, genre_id: 1,
        url: "good",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/good/art.jpg'}),
      r({ name: 'Heat of the Summer', artist_id: 6, genre_id: 1,
        url: "heatofthesummer",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/heatofthesummer/art.jpg'}),
      r({ name: 'Town of Two Houses', artist_id: 7, genre_id: 3,
        url: "townoftwohouses",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/art.jpg'}),
      r({ name: 'split', artist_id: 7, genre_id: 2,
        url: "split",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/split/art.jpg'}),
      r({ name: 'Funeral Void', artist_id: 8, genre_id: 4,
        url: "funeralvoid",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/art.jpg'}),
      r({ name: 'Camouflage', artist_id: 1, genre_id: 7,
        url: "camouflage",
        cover_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/camouflage/art.jpg'}),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums');
  }
};
