'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { 
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        len: [1, 255]
      }
     },
    email: { 
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255]
      }
     },
    password: { 
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60,60]
      }
     },
    session_token: {
      type : DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Artist, { foreignKey: 'user_id', as: "user" });

    User.belongsToMany(models.Artist, {
      through: 'User_Follows',
      otherKey: 'artist_id',
      foreignKey: 'user_id',
    })

    User.belongsToMany(models.Album, {
      through: 'User_Collections',
      otherKey: 'album_id',
      foreignKey: 'user_id',
    })
  };

  User.prototype.isValid = () => true;

  User.prototype.setPassword = function (pw) {
    this.password = bcrypt.hashSync(pw);
    return this;
  };

  User.prototype.isValidPassword = function (pw) {
    return bcrypt.compareSync(pw, this.password.toString());
  };

  User.prototype.toSafeObject = function () {
    return {
      createdAt: this.createdAt,
      username: this.username,
      email: this.email,
      id: this.id,
      updatedAt: this.updatedAt,
    }
  }

  return User;
};