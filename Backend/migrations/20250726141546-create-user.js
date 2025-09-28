'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
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
      emergencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'emergencies',
          key: 'id'
        }
      },
      studentName: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      
      password: {
        type: Sequelize.STRING
      },
      confirmPassword: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      floorNumber: {
        type: Sequelize.INTEGER
      },
      registerNumber: {
        type: Sequelize.INTEGER
      },
      roomNumber: {
        type: Sequelize.INTEGER
      },
      indexNumber: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      parentName: {
        type: Sequelize.STRING
      },
      parentPhonenumber: {
        type: Sequelize.INTEGER
      },
      otherDetails: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};