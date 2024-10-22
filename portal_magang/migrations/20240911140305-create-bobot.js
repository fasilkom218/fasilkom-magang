"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bobots", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      disiplin: {
        type: Sequelize.FLOAT,
      },
      sikap: {
        type: Sequelize.FLOAT,
      },
      tanggung_jawab: {
        type: Sequelize.FLOAT,
      },
      kehadiran: {
        type: Sequelize.FLOAT,
      },
      tata_tertib: {
        type: Sequelize.FLOAT,
      },
      penampilan: {
        type: Sequelize.FLOAT,
      },
      kemampuan_kerja: {
        type: Sequelize.FLOAT,
      },
      keterampilan_kerja: {
        type: Sequelize.FLOAT,
      },
      kualitas_kerja: {
        type: Sequelize.FLOAT,
      },
      kemampuan_berkomunikasi: {
        type: Sequelize.FLOAT,
      },
      kerjasama: {
        type: Sequelize.FLOAT,
      },
      kerajinan: {
        type: Sequelize.FLOAT,
      },
      percaya_diri: {
        type: Sequelize.FLOAT,
      },
      relevansi: {
        type: Sequelize.FLOAT,
      },
      isi_laporan: {
        type: Sequelize.FLOAT,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      nilaiId: {
        type: Sequelize.STRING,
      },
      mhsId: {
        type: Sequelize.STRING,
      },
      userId: {
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
    await queryInterface.dropTable("Bobots");
  },
};
