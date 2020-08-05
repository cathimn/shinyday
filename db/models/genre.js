'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    genre: DataTypes.STRING
  }, {});
  Genre.associate = function(models) {
    Genre.hasMany(models.Album, { foreignKey: 'genre_id', as: "albums" });
  };
  return Genre;
};