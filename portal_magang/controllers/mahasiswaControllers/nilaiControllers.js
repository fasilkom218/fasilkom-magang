const Nilai = require("../../models").Nilai;
const Bobot = require("../../models").Bobot;
const Mahasiswa = require("../../models").Mahasiswa;
const User = require("../../models").User;

module.exports = {
  // ------------------------------ START GET ALL NILAI ------------------------------ //
  getNilaiMhs: async (req, res) => {
    try {
      const nilai = await Nilai.findAll({
        where: {
          mhsId: req.mhsId,
        },
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "npm",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkCV",
              "linkRekom",
              "desc",
            ],
          },
          {
            model: User,
            attributes: [
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
        ],
      });

      if (nilai.length === 0) {
        return res.status(404).json({
          message: "Tidak ada data nilai",
        });
      }

      res.status(200).json({
        message: "Success get all data nilai",
        data: nilai,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET ALL NILAI ------------------------------ //

  // ------------------------------ START GET NILAI BY ID ------------------------------ //
  getNilaiMhsById: async (req, res) => {
    const { id } = req.params;

    try {
      const nilai = await Nilai.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "npm",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkCV",
              "linkRekom",
              "desc",
            ],
          },
          {
            model: User,
            attributes: [
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
        ],
      });

      if (!nilai) {
        return res.status(404).json({
          message: "Tidak ada data nilai",
        });
      }

      res.status(200).json({
        message: "Success get data nilai by id",
        data: nilai,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET NILAI BY ID ------------------------------ //

  // ------------------------------ START GET ALL NILAI MAGANG ------------------------------ //
  getBobotMhs: async (req, res) => {
    try {
      const bobot = await Bobot.findAll({
        where: {
          mhsId: req.mhsId,
        },
        include: [
          {
            model: Nilai,
          },
          {
            model: User,
            attributes: [
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
          {
            model: Mahasiswa,
            attributes: {
              exclude: ["password", "updatedAt"],
            },
          },
        ],
      });

      if (bobot.length === 0) {
        return res.status(404).json({
          message: "Tidak ada data nilai",
        });
      }

      res.status(200).json({
        message: "Success get all data nilai",
        data: bobot,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET ALL NILAI MAGANG ------------------------------ //

  // ------------------------------ START GET NILAI MAGANG BY ID ------------------------------ //
  getBobotById: async (req, res) => {
    const { id } = req.params;

    try {
      const bobot = await Bobot.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Nilai,
          },
          {
            model: User,
            attributes: [
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
          {
            model: Mahasiswa,
            attributes: {
              exclude: ["password", "updatedAt"],
            },
          },
        ],
      });

      if (!bobot) {
        return res.status(404).json({
          message: "Tidak ada data nilai",
        });
      }

      res.status(200).json({
        message: "Success get data nilai by id",
        data: bobot,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET NILAI MAGANG BY ID ------------------------------ //
};
