'use strict';

const { ENUM } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hostels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostelName: {
        type: Sequelize.STRING
      },
      register_count: {
        type: Sequelize.INTEGER
      },
      leave_count: {
        type: Sequelize.INTEGER
      },
      sick_count: {
        type: Sequelize.INTEGER
      },
      room_count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hostels');
  }
};