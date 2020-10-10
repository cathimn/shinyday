'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Collection = sequelize.define('User_Collection', {
    user_id: {
      type: DataTypes.INTEGER, },
    album_id: {
      type: DataTypes.INTEGER, },
    favorite: DataTypes.INTEGER,
  }, {
      indexes: [
        {
          unique: true,
          fields: ["album_id", "user_id"]
        }
      ]
  });
  User_Collection.associate = function(models) {
    // associations can be defined here
  };
  return User_Collection;
};
