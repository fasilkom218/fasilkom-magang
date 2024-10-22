"use strict";

const argon = require("argon2");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await argon.hash("Fasilkom123");
    return queryInterface.bulkInsert("Users", [
      {
        id: "1c8d8b9d-7b7d-4c7b-8a7b-6a7b5a7b5a7b",
        name: "Official Fasilkom",
        email: "magangfasilkom@gmail.com",
        password: hashedPassword,
        profile: null,
        alamat: null,
        no_telpon: null,
        role: "admin",
        refresh_token: null,
        desc: "Akun resmi Fasilkom Unsika",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
