'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      r({ name: 'Club Album', artist_id: 1, genre_id: 2 }),
      r({ name: 'Haumea', artist_id: 2, genre_id: 4 }),
      r({ name: 'I Wanna Hear The Music', artist_id: 3, genre_id: 6 }),
      r({ name: 'ELEGIAC SYMPHONY', artist_id: 4, genre_id: 5 }),
      r({ name: 'lullaby', artist_id: 4, genre_id: 5 }),
      r({ name: 'Metamorph', artist_id: 5, genre_id: 3 }),
      r({ name: 'G.O.O.D.', artist_id: 6, genre_id: 1 }),
      r({ name: 'Heat of the Summer', artist_id: 6, genre_id: 1 }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums');
  }
};
