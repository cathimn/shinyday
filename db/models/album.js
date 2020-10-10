'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.artist_name.toLowerCase().replace(/[\s|\W]/gm, "");
      }
    },
    artist_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER,
    cover_url: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.Artist, { foreignKey: 'artist_id', as: "artist" });
    Album.belongsTo(models.Genre, { foreignKey: 'genre_id', as: "genre" });

    Album.belongsToMany(models.User, {
      through: 'User_Collection',
      otherKey: 'user_id',
      foreignKey: 'album_id'
    });

    Album.hasMany(models.Song, { foreignKey: 'album_id', as: "songs" })
  };

  return Album;
};
