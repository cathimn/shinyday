'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      r({ name: 'Everything\'s Gone...', artist_id: 1, genre_id: 7, url: "everythingsgone" }),
      r({ name: 'Haumea', artist_id: 2, genre_id: 4, url: "haumea" }),
      r({ name: 'I Wanna Hear The Music', artist_id: 3, genre_id: 6, url: "iwannahearthemusic" }),
      r({ name: 'ELEGIAC SYMPHONY', artist_id: 4, genre_id: 5, url: "elegiacsymphony" }),
      r({ name: 'lullaby', artist_id: 4, genre_id: 5, url: "lullaby" }),
      r({ name: 'Metamorph', artist_id: 5, genre_id: 3, url: "metamorph" }),
      r({ name: 'G.O.O.D.', artist_id: 6, genre_id: 1, url: "good" }),
      r({ name: 'Heat of the Summer', artist_id: 6, genre_id: 1, url: "heatofthesummer" }),
      r({ name: 'Town of Two Houses', artist_id: 7, genre_id: 3, url: "townoftwohouses" }),
      r({ name: 'split', artist_id: 7, genre_id: 3, url: "split" }),
      r({ name: 'Funeral Void', artist_id: 8, genre_id: 4, url: "funeralvoid" }),
      r({ name: 'Camouflage', artist_id: 1, genre_id: 7, url: "camouflage" }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums');
  }
};
