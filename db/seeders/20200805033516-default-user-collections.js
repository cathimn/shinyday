'use strict';
function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User_Collections', [
      r({ user_id: 1, album_id: 1 }),
      r({ user_id: 2, album_id: 1 }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_Collections');
  }
};
