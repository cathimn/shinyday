'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      r({ track_num: 4, name: 'Stage 1 Level 24', album_id: 8, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/heatofthesummer/04_-_Stage_1_Level_24.mp3' }),
      r({ track_num: 11, name: 'Estampe Galactus Barbare Epaul Giraffe Ennui', album_id: 8, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/heatofthesummer/11_-_Estampe_Galactus_Barbare_Epaul_Giraffe_Ennui.mp3' }),
      r({ track_num: 4, name: 'Aimer, cest ce quil y a de plus beau', album_id: 7, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/good/Monplaisir_-_04_-_Aimer_cest_ce_quil_y_a_de_plus_beau.mp3' }),
      r({ track_num: 6, name: 'Je voudrais etre un pigeon', album_id: 7, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/good/Monplaisir_-_06_-_Je_voudrais_tre_un_pigeon.mp3'}),
      r({ track_num: 8, name: 'On est bien, la', album_id: 7, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/good/Monplaisir_-_08_-_On_est_bien_l.mp3'}),
      r({ track_num: 9, name: 'Pourquoi est-ce que j\'en ai quelque chose a faire', album_id: 7, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/good/Monplaisir_-_09_-_Pourquoi_est-ce_que_jen_ai_quelque_chose__faire_.mp3' }),
      r({ track_num: 11, name: '666666666666666666666', album_id: 7, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/good/Monplaisir_-_11_-_66666666666666666666_66666666666666666666_66666666666666666666_66666666666666666666_66666666666666666666_66666666666666666666.mp3' }),
      r({ track_num: 5, name: 'Monolog - Beautifull remix', album_id: 6, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/gritt/metamorph/Gritt_-_05_-_Monolog_-_Beautifull_remix.mp3' }),
      r({ track_num: 27, name: 'lullaby', album_id: 5, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/lullaby/Dee_Yan-Key_-_27_-_lullaby.mp3'}),
      r({ track_num: 1, name: 'Elegy for Argus', album_id: 4, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/elegiacsymphony/Dee_Yan-Key_-_01_-_Elegy_for_Argus.mp3'}),
      r({ track_num: 2, name: 'Metamorphosis (The Peacock)', album_id: 4, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/elegiacsymphony/Dee_Yan-Key_-_02_-_Metamorphosis__The_Peacock.mp3'}),
      r({ track_num: 3, name: 'The Satyr\'s Sorrow', album_id: 4, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/deeyankey/elegiacsymphony/Dee_Yan-Key_-_03_-_The_Satyrs_Sorrow.mp3' }),
      r({ track_num: 2, name: 'I Don\'t Wanna Talk To My Neighbors - feat. dislotec', album_id: 3, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/iwannahearthemusic/Breakmaster_Cylinder_-_02_-_I_Dont_Wanna_Talk_To_My_Neighbors_-_feat_dislotec.mp3' }),
      r({ track_num: 3, name: 'Purplebutter', album_id: 3, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/iwannahearthemusic/Breakmaster_Cylinder_-_03_-_Purplebutter.mp3' }),
      r({ track_num: 4, name: 'Out Of Control Tattoo Applicator Arm', album_id: 3, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/iwannahearthemusic/Breakmaster_Cylinder_-_04_-_Out_Of_Control_Tattoo_Applicator_Arm.mp3'}),
      r({ track_num: 5, name: 'Slow Down, Seahorse', album_id: 3, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/breakmastercylinder/iwannahearthemusic/Breakmaster_Cylinder_-_05_-_Slow_Down_Seahorse.mp3' }),
      r({ track_num: 1, name: 'Haumea', album_id: 2, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/haumea/01Haumea.mp3'}),
      r({ track_num: 2, name: 'Warm Atmosphere', album_id: 2, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/haumea/02WarmAtmosphere.mp3' }),
      r({ track_num: 3, name: 'Moon Answer', album_id: 2, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/haumea/03MoonAnswer.mp3'}),
      r({ track_num: 1, name: 'Woods of Doom', album_id: 11, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/01_-_Woods_of_Doom.mp3' }),
      r({ track_num: 2, name: 'Sir Maelstrom', album_id: 11, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/02_-_Sir_Maelstrom.mp3' }),
      r({ track_num: 3, name: 'Blood Sorcery', album_id: 11, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/03_-_Blood_Sorcery.mp3' }),
      r({ track_num: 4, name: 'Aurora of Evil', album_id: 11, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/04_-_Aurora_of_Evil.mp3' }),
      r({ track_num: 5, name: 'Necropolitan', album_id: 11, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/05_-_Necropolitan.mp3' }),
      r({ track_num: 6, name: 'Fleeing Sun', album_id: 11, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/06_-_Fleeing_Sun.mp3' }),
      r({ track_num: 1, name: '11,600 years ago', album_id: 10, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/split/Blear_Moon_-_01_-_11600_years_ago.mp3' }),
      r({ track_num: 2, name: 'There', album_id: 10, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/split/Blear_Moon_-_02_-_There.mp3'}),
      r({ track_num: 6, name: 'Ongoing cases', album_id: 10, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/split/Blear_Moon_-_03_-_Ongoing_cases.mp3' }),
      r({ track_num: 7, name: 'Few survivors', album_id: 10, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/split/Blear_Moon_-_07_-_Few_survivors.mp3' }),
      r({ track_num: 1, name: 'These Walls Are Talking', album_id: 9, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/Blear_Moon_-_01_-_These_Walls_Are_Talking.mp3'}),
      r({ track_num: 2, name: 'Arctic Fog', album_id: 9, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/Blear_Moon_-_02_-_Arctic_Fog.mp3' }),
      r({ track_num: 3, name: 'Flekkefjord', album_id: 9, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/Blear_Moon_-_03_-_Flekkefjord.mp3'}),
      r({ track_num: 4, name: 'Boat for Sale', album_id: 9, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/Blear_Moon_-_04_-_Boat_for_Sale.mp3' }),
      r({ track_num: 5, name: 'Cold Summer Landscape', album_id: 9, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/Blear_Moon_-_05_-_Cold_Summer_Landscape.mp3'}),
      r({ track_num: 6, name: 'Gean', album_id: 9, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/Blear_Moon_-_06_-_Gean.mp3' }),
      r({ track_num: 1, name: 'Everything\'s Gone', album_id: 1, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/everythingsgone/Blah_Blah_Blah_-_03_-_Everythings_gone.mp3' }),
      r({ track_num: 2, name: 'There are no answers', album_id: 12, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/camouflage/Blah_Blah_Blah_-_01_-_There_are_no_answers.mp3' }),
      r({ track_num: 3, name: 'I\'m putting my house on wheels', album_id: 12, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/camouflage/Blah_Blah_Blah_-_02_-_Im_putting_my_house_on_wheels.mp3'}),
      r({ track_num: 4, name: 'You\'re not a bird', album_id: 12, song_url: 'https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/camouflage/Blah_Blah_Blah_-_03_-_Youre_not_a_bird.mp3' }),

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs');
  }
};
