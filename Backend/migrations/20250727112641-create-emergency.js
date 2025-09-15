'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emergencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subwardenName: {
        type: Sequelize.STRING
      },
      subwardenContactnumber: {
        type: Sequelize.INTEGER
      },
      medicalcenterName: {
        type: Sequelize.STRING
      },
      medicalcenterContactnumber: {
        type: Sequelize.INTEGER
      },
      ambulanceName: {
        type: Sequelize.STRING
      },
      ambulanceContactnumber: {
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
    await queryInterface.dropTable('Emergencies');
  }
};