"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Logbooks", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.TEXT,
      },
      dateOfPosting: {
        type: Sequelize.DATE,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("waiting", "accepted", "revision"),
        defaultValue: "waiting",
      },
      userId: {
        type: Sequelize.STRING,
      },
      dospemId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Logbooks");
  },
};
