'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User_Follows', [
      r({ artist_id: 1, user_id: 1 }),
      r({ artist_id: 1, user_id: 2 }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_Follows');
  }
};
