'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    track_num: DataTypes.INTEGER,
    name: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    song_url: DataTypes.STRING,
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Album, { foreignKey: 'album_id', as: "album" });

    Song.belongsToMany(models.User, {
      through: 'User_Collections',
      otherKey: 'user_id',
      foreignKey: 'favorite', })
  };
  return Song;
};
