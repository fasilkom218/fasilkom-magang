const MagangReguler = require("../../models").MagangReguler;
const Mahasiswa = require("../../models").Mahasiswa;
const MagangKompetensi = require("../../models").MagangKompetensi;

module.exports = {
  //   ---------------- START FITUR GET DATA MAGANG REGULER ------------------------ //
  getAllMagangRegulerAdmin: async (req, res) => {
    try {
      const magangReguler = await MagangReguler.findAll({
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
        ],
      });

      if (magangReguler.length === 0) {
        return res.status(404).json({
          message: "No data submission found!",
        });
      }

      res.status(200).json({
        message: "Success get all data magang reguler",
        data: magangReguler,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET DATA MAGANG REGULER ------------------------ //

  //   ---------------- START FITUR GET DATA MAGANG REGULER ------------------------ //
  getAllMagangKompetensiAdmin: async (req, res) => {
    try {
      const magangKompetensi = await MagangKompetensi.findAll({
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
        ],
      });

      if (magangKompetensi.length === 0) {
        return res.status(404).json({
          message: "No data submission found!",
        });
      }

      res.status(200).json({
        message: "Success get all data magang reguler",
        data: magangKompetensi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET DATA MAGANG REGULER ------------------------ //
};
