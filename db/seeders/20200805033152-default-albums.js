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
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums');
  }
};
