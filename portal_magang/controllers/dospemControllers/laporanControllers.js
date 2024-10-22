const Mahasiswa = require("../../models").Mahasiswa;
const LaporanMagang = require("../../models").LaporanMagang;
const User = require("../../models").User;

module.exports = {
  // ------------------------------ START GET ALL LAPORAN MAGANG ------------------------------ //
  getLaporanDospem: async (req, res) => {
    try {
      const laporan = await LaporanMagang.findAll({
        where: {
          dospemId: req.userId,
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
            attributes: {
              exclude: ["password", "refresh_token", "updatedAt"],
            },
          },
        ],
      });

      if (!laporan) {
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
  getLaporanDospemById: async (req, res) => {
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
            attributes: {
              exclude: ["password", "refresh_token", "updatedAt"],
            },
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

  // ------------------------------ START REVIEW LAPORAN MAGANG ------------------------------ //
  reviewLaporan: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const laporan = await LaporanMagang.findOne({
      where: {
        id,
      },
    });

    if (!laporan) {
      return res.status(404).json({
        message: "Tidak ada data laporan magang",
      });
    }

    try {
      if (data.status === "accepted") {
        await LaporanMagang.update(
          {
            status: data.status,
            comment: null,
          },
          {
            where: {
              id,
            },
          }
        );
      } else {
        await LaporanMagang.update(
          {
            status: data.status,
            comment: data.comment,
          },
          {
            where: {
              id,
            },
          }
        );
      }

      res.status(200).json({
        message: "Success update laporan magang",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END REVIEW LAPORAN MAGANG  ------------------------------ //
};
