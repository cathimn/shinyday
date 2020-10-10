'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Collections', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        unique: 'compositeIndex'
      },
      album_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums'
        },
        unique: 'compositeIndex'
      },
      favorite: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Songs'
        }
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
          fields: ["album_id", "user_id"]
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_Collections');
  }
};
