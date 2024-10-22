const DosenPembimbing = require("../../models").DosenPembimbing;
const Mahasiswa = require("../../models").Mahasiswa;
const User = require("../../models").User;

module.exports = {
  // ---------------- START FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING ------------------------ //
  getAllBimbingan: async (req, res) => {
    try {
      const dospem = await DosenPembimbing.findAll({
        where: {
          dospemId: req.userId,
        },
        attributes: [
          "id",
          "nama",
          "npm",
          "tempat_magang",
          "alamat_magang",
          "pic",
          "kontak_pic",
          "tgl_mulai",
          "tgl_selesai",
          "status",
          "bidang_minat",
          "rencana_magang",
          "mhsId",
          "dospemId",
          "createdAt",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "id",
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

      if (dospem.length === 0) {
        return res.status(404).json({
          message: "Tidak ada daftar bimbingan",
        });
      }

      res.status(200).json({
        message: "Success get all data bimbingan",
        data: dospem,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING ------------------------ //

  //   ---------------- START FITUR GET DATA PLOTING DOSEN PEMBIMBING BY ID ------------------------ //
  getBimbinganById: async (req, res) => {
    const id = req.params.id;

    try {
      const dospem = await DosenPembimbing.findOne({
        where: {
          id,
        },
        attributes: [
          "id",
          "nama",
          "npm",
          "tempat_magang",
          "alamat_magang",
          "pic",
          "kontak_pic",
          "tgl_mulai",
          "status",
          "tgl_selesai",
          "bidang_minat",
          "rencana_magang",
          "mhsId",
          "dospemId",
          "createdAt",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "id",
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

      if (!dospem) {
        return res.status(404).json({
          message: "Data bimbingan tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Success get data bimbingan by id",
        data: dospem,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET DATA PLOTING DOSEN PEMBIMBING BY ID ------------------------ //

  // ---------------- START FITUR GET ALL DATA PLOTING NILAI MITRA ------------------------ //
  getAllBimbinganMitra: async (req, res) => {
    try {
      const dospem = await DosenPembimbing.findAll({
        attributes: [
          "id",
          "nama",
          "npm",
          "tempat_magang",
          "alamat_magang",
          "pic",
          "kontak_pic",
          "tgl_mulai",
          "tgl_selesai",
          "status",
          "bidang_minat",
          "rencana_magang",
          "mhsId",
          "dospemId",
          "createdAt",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: [
              "id",
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

      if (dospem.length === 0) {
        return res.status(404).json({
          message: "Tidak ada daftar bimbingan",
        });
      }

      res.status(200).json({
        message: "Success get all data bimbingan",
        data: dospem,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET ALL DATA PLOTING NILAI MITRA ------------------------ //
};
