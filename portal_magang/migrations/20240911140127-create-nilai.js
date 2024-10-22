"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Nilais", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      disiplin: {
        type: Sequelize.INTEGER,
      },
      sikap: {
        type: Sequelize.INTEGER,
      },
      tanggung_jawab: {
        type: Sequelize.INTEGER,
      },
      kehadiran: {
        type: Sequelize.INTEGER,
      },
      tata_tertib: {
        type: Sequelize.INTEGER,
      },
      penampilan: {
        type: Sequelize.INTEGER,
      },
      kemampuan_kerja: {
        type: Sequelize.INTEGER,
      },
      keterampilan_kerja: {
        type: Sequelize.INTEGER,
      },
      kualitas_kerja: {
        type: Sequelize.INTEGER,
      },
      kemampuan_berkomunikasi: {
        type: Sequelize.INTEGER,
      },
      kerjasama: {
        type: Sequelize.INTEGER,
      },
      kerajinan: {
        type: Sequelize.INTEGER,
      },
      percaya_diri: {
        type: Sequelize.INTEGER,
      },
      relevansi: {
        type: Sequelize.INTEGER,
      },
      isi_laporan: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Nilais");
  },
};
