const LaporanMagang = require("../../models").LaporanMagang;
const ApplyJob = require("../../models").applyJob;
const Mahasiswa = require("../../models").Mahasiswa;
const DosenPembimbing = require("../../models").DosenPembimbing;
const User = require("../../models").User;

module.exports = {
  // --------------- START FITUR GET LAPORAN MAGANG --------------------- //

  getLaporan: async (req, res) => {
    try {
      const laporan = await LaporanMagang.findAll({
        attributes: [
          "id",
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "status",
          "comment",
          "mhsId",
          "createdAt",
        ],
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
        where: {
          mhsId: req.mhsId,
        },
      });

      if (laporan.length === 0) {
        return res.status(404).json({
          message: "Tidak ada laporan magang yang tersedia!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG ----------------------- //

  // --------------- START FITUR GET LAPORAN MAGANG BY ID ----------------------- //

  getLaporanByID: async (req, res) => {
    const { id } = req.params;

    try {
      const laporan = await LaporanMagang.findOne({
        where: {
          id,
        },
        attributes: [
          "id",
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "status",
          "comment",
          "mhsId",
          "createdAt",
        ],
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
          message: "Tidak ada laporan magang ditemukan!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan magang by id",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG BY ID ------------------------- //

  // --------------- START FITUR UPLOAD LAPORAN ------------------------- //

  uploadLaporan: async (req, res) => {
    try {
      const dospem = await DosenPembimbing.findOne({
        where: {
          mhsId: req.mhsId,
          status: "accepted",
        },
      });

      if (!dospem) {
        return res.status(400).json({
          message: "Anda belum memiliki dosen pembimbing",
        });
      }

      const data = req.body;

      const upLaporan = await LaporanMagang.create({
        nama: data.nama,
        npm: data.npm,
        dosen_pembimbing: data.dosen_pembimbing,
        tempat_magang: data.tempat_magang,
        alamat_magang: data.alamat_magang,
        longitude_magang: data.longitude_magang,
        latitude_magang: data.latitude_magang,
        lembar_pengesahan: data.lembar_pengesahan,
        laporan_magang: data.laporan_magang,
        dokumentasi: data.dokumentasi,
        mhsId: req.mhsId,
        dospemId: dospem.dospemId,
      });

      res.status(201).json({
        message: "Success upload laporan magang",
        data: upLaporan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // --------------- END FITUR UPLOAD LAPORAN --------------------------- //

  // --------------- START FITUR UPDATE LAPORAN --------------------------- //

  updateLaporan: async (req, res) => {
    const { id } = req.params;

    try {
      const laporan = await LaporanMagang.findOne({
        where: {
          id,
        },
      });

      if (!laporan) {
        return res.status(404).json({
          message: "Tidak ada laporan yang ditemukan!",
        });
      }

      const data = req.body;

      await LaporanMagang.update(
        {
          nama: data.nama,
          npm: data.npm,
          dosen_pembimbing: data.dosen_pembimbing,
          tempat_magang: data.tempat_magang,
          alamat_magang: data.alamat_magang,
          longitude_magang: data.longitude_magang,
          latitude_magang: data.latitude_magang,
          lembar_pengesahan: data.lembar_pengesahan,
          laporan_magang: data.laporan_magang,
          dokumentasi: data.dokumentasi,
          mhsId: req.mhsId,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Success update laporan magang",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // --------------- END FITUR UPDATE LAPORAN ----------------------------- //

  // --------------- START FITUR DELETE LAPORAN ----------------------------- //

  deleteLaporan: async (req, res) => {
    const { id } = req.params;

    try {
      await LaporanMagang.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Success delete laporan magang",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // --------------- START FITUR GET LAPORAN MAGANG (ADMIN) --------------------- //

  getLaporanAdmin: async (req, res) => {
    try {
      const laporan = await LaporanMagang.findAll({
        attributes: [
          "id",
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "mhsId",
          "createdAt",
        ],
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

      if (laporan.length == 0) {
        return res.status(404).json({
          message: "Tidak ada laporan magang yang tersedia!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG (ADMIN) ----------------------- //

  // --------------- START FITUR GET LAPORAN MAGANG BY ID (ADMIN) ----------------------- //

  getLaporanByIDAdmin: async (req, res) => {
    const { id } = req.params;

    try {
      const laporan = await LaporanMagang.findOne({
        where: {
          id,
        },
        attributes: [
          "nama",
          "npm",
          "dosen_pembimbing",
          "tempat_magang",
          "alamat_magang",
          "longitude_magang",
          "latitude_magang",
          "lembar_pengesahan",
          "laporan_magang",
          "dokumentasi",
          "mhsId",
        ],
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

      if (!laporan) {
        return res.status(404).json({
          message: "Tidak ada laporan magang ditemukan!",
        });
      }

      res.status(200).json({
        message: "Success get data laporan magang",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // --------------- END FITUR GET LAPORAN MAGANG BY ID (ADMIN) ------------------------- //
};
