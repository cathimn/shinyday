'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Follow = sequelize.define('User_Follow', {
    // artist_id: DataTypes.INTEGER,
    // user_id: DataTypes.INTEGER
  }, {});
  User_Follow.associate = function(models) {
    // associations can be defined here
  };
  return User_Follow;
};
