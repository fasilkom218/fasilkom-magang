const Mahasiswa = require("../../models").Mahasiswa;
const MagangKompetensi = require("../../models").MagangKompetensi;

module.exports = {
  // ---------------- START FITUR GET ALL DATA MAGANG REGULER ------------------------ //
  getAllMagangKompetensi: async (req, res) => {
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
        where: {
          mhsId: req.mhsId,
        },
      });

      if (magangKompetensi.length === 0) {
        return res.status(404).json({
          message: "No data submission found!",
        });
      }

      res.status(200).json({
        message: "Success get all data magang kompetensi",
        data: magangKompetensi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET ALL DATA MAGANG REGULER ------------------------ //

  // ---------------- START FITUR GET DATA MAGANG REGULER BY ID ------------------------ //
  getMagangKompetensiByID: async (req, res) => {
    const { id } = req.params;

    try {
      const magangKompetensi = await MagangKompetensi.findOne({
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
        ],
      });

      if (!magangKompetensi) {
        return res.status(404).json({
          message: "Data magang kompetensi not found",
        });
      }

      res.status(200).json({
        message: "Success get data magang kompetensi by id",
        data: magangKompetensi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET DATA MAGANG REGULER BY ID ------------------------ //

  // ---------------- START FITUR CREATE DATA MAGANG REGULER ------------------------ //
  createMagangKompetensi: async (req, res) => {
    try {
      const data = req.body;

      const magangKompetensi = await MagangKompetensi.create({
        nama: data.nama,
        npm: data.npm,
        ttl: data.ttl,
        anggota: data.anggota,
        nama_kompetisi: data.nama_kompetisi,
        tingkat_kompetisi: data.tingkat_kompetisi,
        tanggal_kompetisi: data.tanggal_kompetisi,
        linkWeb: data.linkWeb,
        bidang_minat: data.bidang_minat,
        mhsId: req.mhsId,
      });

      res.status(201).json({
        message: "Success create submission magang kompetensi",
        data: magangKompetensi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR CREATE DATA MAGANG REGULER ------------------------ //

  // ---------------- START FITUR UPDATE DATA MAGANG REGULER ------------------------ //
  updateMagangKompetensi: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const magangKompetensi = MagangKompetensi.findOne({
      where: {
        id,
      },
    });

    if (!magangKompetensi) {
      return res.status(404).json({
        message: "Your submission not found",
      });
    }

    try {
      await MagangKompetensi.update(
        {
          nama: data.nama,
          npm: data.npm,
          ttl: data.ttl,
          anggota: data.anggota,
          nama_kompetisi: data.nama_kompetisi,
          tingkat_kompetisi: data.tingkat_kompetisi,
          tanggal_kompetisi: data.tanggal_kompetisi,
          linkWeb: data.linkWeb,
          bidang_minat: data.bidang_minat,
          mhsId: req.mhsId,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Success update submission magang kompetensi",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR UPDATE DATA MAGANG REGULER ------------------------ //

  // ---------------- START FITUR DELETE DATA MAGANG REGULER ------------------------ //
  deleteMagangKompetensi: async (req, res) => {
    const { id } = req.params;

    try {
      await MagangKompetensi.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Success delete submission magang kompetensi",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR DELETE DATA MAGANG REGULER ------------------------ //
};
