"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MagangKompetensis", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nama: {
        type: Sequelize.STRING,
      },
      npm: {
        type: Sequelize.STRING,
      },
      anggota: {
        type: Sequelize.STRING,
      },
      nama_kompetisi: {
        type: Sequelize.STRING,
      },
      tingkat_kompetisi: {
        type: Sequelize.STRING,
      },
      tanggal_kompetisi: {
        type: Sequelize.STRING,
      },
      linkWeb: {
        type: Sequelize.STRING,
      },
      bidang_minat: {
        type: Sequelize.ENUM("software", "network", "data"),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("waiting", "accepted", "rejected"),
        defaultValue: "waiting",
      },
      mhsId: {
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
    await queryInterface.dropTable("MagangKompetensis");
  },
};
