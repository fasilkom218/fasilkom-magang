const Mahasiswa = require("../../models").Mahasiswa;
const LaporanMagang = require("../../models").LaporanMagang;
const User = require("../../models").User;

module.exports = {
  // ------------------------------ START GET ALL LAPORAN MAGANG ------------------------------ //
  getLaporanKaprodi: async (req, res) => {
    try {
      const laporan = await LaporanMagang.findAll({
        where: {
          status: "accepted",
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
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkRekom",
              "desc",
            ],
          },
          {
            model: User,
            attributes: ["id", "name", "email", "profile", "role", "desc"],
          },
        ],
      });

      if (laporan.length === 0) {
        return res.status(404).json({
          message: "Tidak ada data laporan magang",
        });
      }

      res.status(200).json({
        message: "Success get all data laporan magang",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET ALL LAPORAN MAGANG ------------------------------ //

  // ------------------------------ START GET LAPORAN MAGANG BY ID ------------------------------ //
  getLaporanKaprodiById: async (req, res) => {
    const { id } = req.params;

    try {
      const laporan = await LaporanMagang.findOne({
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
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkRekom",
              "desc",
            ],
          },
          {
            model: User,
            attributes: ["id", "name", "email", "profile", "role", "desc"],
          },
        ],
      });

      if (!laporan) {
        return res.status(404).json({
          message: "Tidak ada data laporan magang",
        });
      }

      res.status(200).json({
        message: "Success get all data laporan magang by id",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET LAPORAN MAGANG BY ID ------------------------------ //
};
