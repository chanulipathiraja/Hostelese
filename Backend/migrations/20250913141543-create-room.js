'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hostels',
          key: 'id'
        }
      },
      roomNo: {
        type: Sequelize.INTEGER
      },
      floorNo: {
        type: Sequelize.INTEGER
      },
      numberofStudents: {
        type: Sequelize.INTEGER
      },
      numberofBeds: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms');
  }
};