'use strict';

const faker = require('faker');

faker.seed(4444);

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  o.description = faker.lorem.sentence();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artists', [
      r({ artist_name: "Blah Blah Blah", user_id: 11,
        url: "blahblahblah",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/avatar.jpg",
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/header.jpg" }),
      r({ artist_name: "Bisou", user_id: 5,
        url: "bisou",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/avatar.jpg", 
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/header.jpg"}),
      r({ artist_name: "Breakmaster Cylinder", user_id: 4,
        url: "breakmastercylinder",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/avatar.jpg", 
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/header.jpg"}),
      r({ artist_name: "Dee Yan-Key", user_id: 6,
        url: "deeyankey",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/avatar.jpg", 
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/header.jpg"}),
      r({ artist_name: "Gritt", user_id: 7,
        url: "gritt",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/gritt/avatar.jpg", 
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/gritt/header.jpg"}),
      r({ artist_name: "Monplaisir", user_id: 8,
        url: "monplaisir",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/avatar.jpg", 
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/header.jpg"}),
      r({ artist_name: "Blear Moon", user_id: 9,
        url: "blearmoon",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/avatar.jpg", 
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/header.jpg" }),
      r({ artist_name: "Cryosyncopy", user_id: 10,
        url: "cryosyncopy",
        avatar_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/avatar.jpg", 
        banner_url: "https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/header.jpg" }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artists');
  }
};
