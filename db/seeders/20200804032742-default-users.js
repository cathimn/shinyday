'use strict';

const { secretPass } = require('../../config/index');

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function createSecretPassword() {
  return bcrypt.hashSync(secretPass)
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
      r({ username: 'oaclub', email: 'admin@outdooractivities.club', password: createPassword() }),
      r({ username: 'bisou', email: 'test1@mail.com', password: createSecretPassword() }),
      r({ username: 'breakmasterc', email: 'test2@mail.com', password: createSecretPassword() }),
      r({ username: 'dyankey', email: 'test3@mail.com', password: createSecretPassword() }),
      r({ username: 'gritt', email: 'test4@mail.com', password: createSecretPassword() }),
      r({ username: 'monplaisir', email: 'test5@mail.com', password: createSecretPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
