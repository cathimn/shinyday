'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Follows', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      artist_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Artists'
        },
        unique: 'compositeIndex'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        unique: 'compositeIndex'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
      {
        uniqueKeys: {
          compositeIndex: {
            customIndex: true,
            fields: ["artist_id", "user_id"]
          }
        }
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_Follows');
  }
};
