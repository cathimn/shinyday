'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      r({ track_num: 1, name: 'Shiny Days', album_id: 1 }),
      r({ track_num: 2, name: 'A Sunny Winter Day', album_id: 1 }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs');
  }
};
