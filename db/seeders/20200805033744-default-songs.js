'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      r({ track_num: 4, name: 'Stage 1 Level 24', album_id: 8 }),
      r({ track_num: 11, name: 'Estampe Galactus Barbare Epaul Giraffe Ennui', album_id: 8 }),
      r({ track_num: 4, name: 'Aimer, cest ce quil y a de plus beau', album_id: 7 }),
      r({ track_num: 6, name: 'Je voudrais etre un pigeon', album_id: 7 }),
      r({ track_num: 8, name: 'On est bien, la', album_id: 7 }),
      r({ track_num: 9, name: 'Pourquoi est-ce que j\'en ai quelque chose a faire', album_id: 7 }),
      r({ track_num: 11, name: '666666666666666666666', album_id: 7 }),
      r({ track_num: 5, name: 'Monolog - Beautifull remix', album_id: 6 }),
      r({ track_num: 27, name: 'lullaby', album_id: 5 }),
      r({ track_num: 1, name: 'Elegy for Argus', album_id: 4 }),
      r({ track_num: 2, name: 'Metamorphosis (The Peacock)', album_id: 4 }),
      r({ track_num: 3, name: 'The Satyr\'s Sorrow', album_id: 4 }),
      r({ track_num: 2, name: 'I Don\'t Wanna Talk To My Neighbors - feat. dislotec', album_id: 3 }),
      r({ track_num: 3, name: 'Purplebutter', album_id: 3 }),
      r({ track_num: 4, name: 'Out Of Control Tattoo Applicator Arm', album_id: 3 }),
      r({ track_num: 5, name: 'Slow Down, Seahorse', album_id: 3 }),
      r({ track_num: 1, name: 'Haumea', album_id: 2 }),
      r({ track_num: 2, name: 'Warm Atmosphere', album_id: 2 }),
      r({ track_num: 3, name: 'Moon Answer', album_id: 2 }),
      r({ track_num: 1, name: 'Woods of Doom', album_id: 11 }),
      r({ track_num: 2, name: 'Sir Maelstrom', album_id: 11 }),
      r({ track_num: 3, name: 'Blood Sorcery', album_id: 11 }),
      r({ track_num: 4, name: 'Aurora of Evil', album_id: 11 }),
      r({ track_num: 5, name: 'Necropolitan', album_id: 11 }),
      r({ track_num: 6, name: 'Fleeing Sun', album_id: 11 }),
      r({ track_num: 1, name: '11,600 years ago', album_id: 10 }),
      r({ track_num: 2, name: 'There', album_id: 10 }),
      r({ track_num: 6, name: 'Ongoing cases', album_id: 10 }),
      r({ track_num: 7, name: 'Few survivors', album_id: 10 }),
      r({ track_num: 1, name: 'These Walls Are Talking', album_id: 9 }),
      r({ track_num: 2, name: 'Arctic Fog', album_id: 9 }),
      r({ track_num: 3, name: 'Flekkefjord', album_id: 9 }),
      r({ track_num: 4, name: 'Boat for Sale', album_id: 9 }),
      r({ track_num: 5, name: 'Cold Summer Landscape', album_id: 9 }),
      r({ track_num: 6, name: 'Gean', album_id: 9 }),
      r({ track_num: 1, name: 'Everything\'s Gone', album_id: 1 }),
      r({ track_num: 2, name: 'There are no answers', album_id: 12 }),
      r({ track_num: 3, name: 'I\'m putting my house on wheels', album_id: 12 }),
      r({ track_num: 4, name: 'You\'re not a bird', album_id: 12 }),

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs');
  }
};
