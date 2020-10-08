'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('readings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookname: {
        type: Sequelize.STRING
      },
      readername: {
        type: Sequelize.STRING
      },
      toread: {
        type: Sequelize.BOOLEAN
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      current: {
        type: Sequelize.INTEGER
      },
      pages: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('readings');
  }
};