'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Collection = sequelize.define('User_Collection', {
    // user_id: DataTypes.INTEGER,
    // album_id: DataTypes.INTEGER
    favorite: DataTypes.INTEGER,
  }, {});
  User_Collection.associate = function(models) {
    // associations can be defined here
  };
  return User_Collection;
};
