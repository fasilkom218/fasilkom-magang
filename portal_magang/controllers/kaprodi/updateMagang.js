const MagangReguler = require("../../models").MagangReguler;
const Mahasiswa = require("../../models").Mahasiswa;
const MagangKompetensi = require("../../models").MagangKompetensi;

module.exports = {
  // ---------------- START FITUR UPDATE DATA MAGANG REGULER ------------------------ //
  updateMagangKaprodi: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const magangReguler = await MagangReguler.findOne({
      where: {
        id,
      },
    });

    if (!magangReguler) {
      return res.status(404).json({
        message: "Submission data not found!",
      });
    }

    try {
      await MagangReguler.update(
        {
          status: data.status,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Success update submission magang reguler",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR UPDATE DATA MAGANG REGULER ------------------------ //

  //   ---------------- START FITUR UPDATE DATA MAGANG KOMPETENSI ------------------------ //
  updateMagangKomptensiKaprodi: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const magangKompetensi = await MagangKompetensi.findOne({
      where: {
        id,
      },
    });

    if (!magangKompetensi) {
      return res.status(404).json({
        message: "Submission data not found!",
      });
    }

    try {
      await MagangKompetensi.update(
        {
          status: data.status,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Success update submission magang reguler",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR UPDATE DATA MAGANG KOMPETENSI ------------------------ //

  //   ---------------- START FITUR GET DATA MAGANG REGULER ------------------------ //
  getAllMagangRegulerKaprodi: async (req, res) => {
    try {
      const magangReguler = await MagangReguler.findAll({
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
  getAllMagangKompetensiKaprodi: async (req, res) => {
    try {
      const magangKompetensi = await MagangKompetensi.findAll({
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
