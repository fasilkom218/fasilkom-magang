const Mahasiswa = require("../../models").Mahasiswa;
const MagangReguler = require("../../models").MagangReguler;

module.exports = {
  // ---------------- START FITUR GET ALL DATA MAGANG REGULER ------------------------ //
  getAllMagangReguler: async (req, res) => {
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
              "linkCV",
              "desc",
            ],
          },
        ],
        where: {
          mhsId: req.mhsId,
        },
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
        message: error.message,
      });
    }
  },
  // ---------------- END FITUR GET ALL DATA MAGANG REGULER ------------------------ //

  // ---------------- START FITUR GET DATA MAGANG REGULER BY ID ------------------------ //
  getMagangRegulerByID: async (req, res) => {
    const { id } = req.params;

    try {
      const magangReguler = await MagangReguler.findOne({
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
              "linkCV",
              "desc",
            ],
          },
        ],
      });

      if (!magangReguler) {
        return res.status(404).json({
          message: "Data magang reguler not found",
        });
      }

      res.status(200).json({
        message: "Success get data magang reguler by id",
        data: magangReguler,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET DATA MAGANG REGULER BY ID ------------------------ //

  // ---------------- START FITUR CREATE DATA MAGANG REGULER ------------------------ //
  createMagangReguler: async (req, res) => {
    try {
      const data = req.body;

      const magangReguler = await MagangReguler.create({
        nama: data.nama,
        npm: data.npm,
        ttl: data.ttl,
        agama: data.agama,
        alamat: data.alamat,
        no_telpon: data.no_telpon,
        nama_perusahaan: data.nama_perusahaan,
        penerima_surat: data.penerima_surat,
        alamat_perusahaan: data.alamat_perusahaan,
        no_telpon_perusahaan: data.no_telpon_perusahaan,
        jenis_perusahaan: data.jenis_perusahaan,
        desc: data.desc,
        mhsId: req.mhsId,
      });

      res.status(201).json({
        message: "Success create submission magang reguler",
        data: magangReguler,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR CREATE DATA MAGANG REGULER ------------------------ //

  // ---------------- START FITUR UPDATE DATA MAGANG REGULER ------------------------ //
  updateMagangReguler: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const magangReguler = MagangReguler.findOne({
      where: {
        id,
      },
    });

    if (!magangReguler) {
      return res.status(404).json({
        message: "Your submission not found",
      });
    }

    try {
      await MagangReguler.update(
        {
          nama: data.nama,
          npm: data.npm,
          ttl: data.ttl,
          agama: data.agama,
          alamat: data.alamat,
          no_telpon: data.no_telpon,
          nama_perusahaan: data.nama_perusahaans,
          penerima_surat: data.penerima_surat,
          alamat_perusahaans: data.alamat_perusahaans,
          no_telpon_perusahaans: data.no_telpon_perusahaans,
          jenis_perusahaans: data.jenis_perusahaans,
          desc: data.desc,
          mhsId: req.mhsId,
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

  // ---------------- START FITUR DELETE DATA MAGANG REGULER ------------------------ //
  deleteMagangReguler: async (req, res) => {
    const { id } = req.params;

    try {
      await MagangReguler.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Success delete submission magang reguler",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR DELETE DATA MAGANG REGULER ------------------------ //
};
