const DosenPembimbing = require("../../models").DosenPembimbing;
const Mahasiswa = require("../../models").Mahasiswa;
const User = require("../../models").User;

module.exports = {
  // ---------------- START FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING ------------------------ //
  getAllBimbinganMhs: async (req, res) => {
    try {
      const dospem = await DosenPembimbing.findAll({
        where: {
          mhsId: req.mhsId,
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
          "bidang_minat",
          "rencana_magang",
          "mhsId",
          "dospemId",
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
  getBimbinganMhsById: async (req, res) => {
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
          "tgl_selesai",
          "bidang_minat",
          "rencana_magang",
          "mhsId",
          "dospemId",
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
};
