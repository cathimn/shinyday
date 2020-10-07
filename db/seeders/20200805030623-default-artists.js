'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artists', [
      r({ artist_name: "Blah Blah Blah", user_id: 11, url: "blahblahblah" }),
      r({ artist_name: "Bisou", user_id: 5, url: "bisou"}),
      r({ artist_name: "Breakmaster Cylinder", user_id: 4, url: "breakmastercylinder" }),
      r({ artist_name: "Dee Yan-Key", user_id: 6, url: "deeyankey" }),
      r({ artist_name: "Gritt", user_id: 7, url: "gritt" }),
      r({ artist_name: "Monplaisir", user_id: 8, url: "monplaisir" }),
      r({ artist_name: "Blear Moon", user_id: 9, url: "blearmoon" }),
      r({ artist_name: "Cryosyncopy", user_id: 10, url: "cryosyncopy" }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artists');
  }
};
