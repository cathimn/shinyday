'use strict';

const bcrypt = require('bcryptjs');
const faker = require('faker')

faker.seed(4444)

function createPassword() {
  return bcrypt.hashSync('password');
}

function createSecretPassword() {
  return bcrypt.hashSync('test')
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

let fakes = [];
while (fakes.length < 5) {
  let fake = [faker.name.firstName(), faker.name.lastName()]
  fakes.push({
    username: faker.internet.userName(...fake),
    email: faker.internet.email(...fake),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ username: 'rin-bear', email: 'rin@outdooractivities.club', password: createPassword() }),
      r({ username: 'nadeshiko_loves_food', email: 'nadeshiko@outdooractivities.club', password: createPassword() }),
      r({ username: 'bisou', email: 'bisou@mail.com', password: createSecretPassword() }),
      r({ username: 'breakmasterc', email: 'breakmasterc@mail.com', password: createSecretPassword() }),
      r({ username: 'dyankey', email: 'dyankey@mail.com', password: createSecretPassword() }),
      r({ username: 'gritt', email: 'gritt@mail.com', password: createSecretPassword() }),
      r({ username: 'monplaisir', email: 'monplaisir@mail.com', password: createSecretPassword() }),
      r({ username: 'blearmoon', email: 'blearmoon@mail.com', password: createSecretPassword() }),
      r({ username: 'luna', email: 'luna@thecat.com', password: createSecretPassword() }),
      r({ username: 'captain', email: 'captain@thecat.com', password: createSecretPassword() }),
      r({ username: 'blahblahblah', email: 'blahblahblah@mail.com', password: createSecretPassword() }),
      r({ username: 'cryosyncopy', email: 'cryosyncopy@mail.com', password: createSecretPassword() }),
      ...fakes
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
