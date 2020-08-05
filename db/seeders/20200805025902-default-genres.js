'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      r({ genre: 'rock' }),
      r({ genre: 'pop' }),
      r({ genre: 'electronic' }),
      r({ genre: 'metal' }),
      r({ genre: 'alternative' }),
      r({ genre: 'hip-hop/rap' }),
      r({ genre: 'punk' }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres');
  }
};
