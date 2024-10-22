"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MagangRegulers", {
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
      ttl: {
        type: Sequelize.DATE,
      },
      agama: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      no_telpon: {
        type: Sequelize.STRING,
      },
      nama_perusahaan: {
        type: Sequelize.STRING,
      },
      penerima_surat: {
        type: Sequelize.STRING,
      },
      alamat_perusahaan: {
        type: Sequelize.STRING,
      },
      no_telpon_perusahaan: {
        type: Sequelize.STRING,
      },
      jenis_perusahaan: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("MagangRegulers");
  },
};
