'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    track_num: DataTypes.INTEGER,
    name: DataTypes.STRING,
    album_id: DataTypes.INTEGER
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Album, { foreignKey: 'album_id', as: "album" });
  };
  return Song;
};