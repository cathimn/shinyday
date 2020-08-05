'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artist_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Artist.associate = function(models) {
    Artist.belongsTo(models.User, { foreignKey: 'user_id', as: "user" });

    Artist.belongsToMany(models.User, {
      through: 'User_Follow',
      otherKey: 'user_id',
      foreignKey: 'artist_id'
    })

    Artist.hasMany(models.Album, { foreignKey: 'artist_id', as: "albums" });
  };
  return Artist;
};