'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ username: 'rin-bear', email: 'rin@outdooractivities.club', password: createPassword() }),
      r({ username: 'nadeshiko_loves_food', email: 'nadeshiko@outdooractivities.club', password: createPassword() }),
      r({ username: 'oaclub', email: 'admin@outdooractivities.club', password: createPassword() })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
