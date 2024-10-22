const DosenPembimbing = require("../../models").DosenPembimbing;
const Mahasiswa = require("../../models").Mahasiswa;
const User = require("../../models").User;

module.exports = {
  // ---------------- START FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING (ADMIN) ------------------------ //

  getDataPlotingKaprodi: async (req, res) => {
    try {
      const dospem = await DosenPembimbing.findAll({
        attributes: [
          "id",
          "nama",
          "npm",
          "surat_covid",
          "surat_balasan",
          "tempat_magang",
          "alamat_magang",
          "pic",
          "kontak_pic",
          "latitude_magang",
          "longitude_magang",
          "tgl_mulai",
          "tgl_selesai",
          "bidang_minat",
          "rencana_magang",
          "status",
          "mhsId",
          "dospemId",
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
        order: [["createdAt", "DESC"]],
      });

      if (dospem.length == 0) {
        return res.status(404).json({
          message: "Tidak ada pengajuan dosen pembimbing",
        });
      }

      res.status(200).json({
        message: "Success get all data ploting dosen pembimbing",
        data: dospem,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING -------------------------- //

  // ---------------- START FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING BY ID ------------------------- //

  getDataPlotingByIDKaprodi: async (req, res) => {
    const { id } = req.params;

    try {
      const dospem = await DosenPembimbing.findOne({
        where: {
          id,
        },
        attributes: [
          "nama",
          "npm",
          "surat_covid",
          "surat_balasan",
          "tempat_magang",
          "alamat_magang",
          "pic",
          "kontak_pic",
          "latitude_magang",
          "longitude_magang",
          "tgl_mulai",
          "tgl_selesai",
          "bidang_minat",
          "rencana_magang",
          "status",
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
        order: [["createdAt", "DESC"]],
      });

      if (!dospem) {
        return res.status(404).json({
          message: "Tidak ada data ploting dosen pembimbing",
        });
      }

      res.status(200).json({
        message: "Success get data ploting dosen pembimbing by id",
        data: dospem,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING BY ID -------------------------- //

  // ---------------- START FITUR PLOTING DOSEN PEMBIMBING ------------------------ //
  plottingDospem: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const dospem = await DosenPembimbing.findOne({
        where: {
          id,
        },
      });

      if (!dospem) {
        return res.status(404).json({
          message: "404 Data not found",
        });
      }

      await DosenPembimbing.update(
        {
          dospemId: data.dospemId,
          status: data.status,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Success update data dospem",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR PLOTING DOSEN PEMBIMBING ------------------------ //

  // ---------------- START FITUR GET LIST DOSPEM ------------------------ //
  getListDospem: async (req, res) => {
    try {
      const user = await User.findAll({
        where: {
          role: "dospem",
        },
        attributes: ["id", "name"],
      });

      if (user.length === 0) {
        return res.status(404).json({
          message: "404 Data not found",
        });
      }

      res.status(200).json({
        message: "Success get list dospem",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR GET LIST DOSPEM ------------------------ //
};
