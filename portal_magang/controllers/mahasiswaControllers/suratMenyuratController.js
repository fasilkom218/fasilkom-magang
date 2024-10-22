const DosenPembimbing = require("../../models").DosenPembimbing;
const MagangReguler = require("../../models").MagangReguler;
const MagangKompetensi = require("../../models").MagangKompetensi;
const Mahasiswa = require("../../models").Mahasiswa;
const User = require("../../models").User;

module.exports = {
  // ---------------- START FITUR GET ALL DATA PLOTING DOSEN PEMBIMBING ------------------------ //

  getDataPloting: async (req, res) => {
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
            attributes: [
              "id",
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
        ],
        where: {
          mhsId: req.mhsId,
        },
      });

      if (dospem.length === 0) {
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

  getDataPlotingByID: async (req, res) => {
    const { id } = req.params;

    try {
      const dospem = await DosenPembimbing.findOne({
        where: {
          id,
        },
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
            attributes: [
              "id",
              "name",
              "email",
              "profile",
              "alamat",
              "no_telpon",
              "role",
              "desc",
            ],
          },
        ],
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

  // ---------------- START FITUR CREATE PLOTING DOSEN PEMBIMBING -------------------------- //

  createDosenPembimbing: async (req, res) => {
    try {
      // const magangReguler = await MagangReguler.findOne({
      //   where: {
      //     mhsId: req.mhsId,
      //     status: "accepted",
      //   },
      // });

      // const magangKompetensi = await MagangKompetensi.findOne({
      //   where: {
      //     mhsId: req.mhsId,
      //     status: "accepted",
      //   },
      // });

      // if (!magangReguler) {
      //   return res.status(400).json({
      //     message: "Pengajuan magang kamu belum ada yang diterima!",
      //   });
      // }

      const data = req.body;

      const plotingDospem = await DosenPembimbing.create({
        nama: data.nama,
        npm: data.npm,
        surat_covid: data.surat_covid,
        surat_balasan: data.surat_balasan,
        tempat_magang: data.tempat_magang,
        alamat_magang: data.alamat_magang,
        pic: data.pic,
        kontak_pic: data.kontak_pic,
        latitude_magang: data.latitude_magang,
        longitude_magang: data.longitude_magang,
        tgl_mulai: data.tgl_mulai,
        tgl_selesai: data.tgl_selesai,
        bidang_minat: data.bidang_minat,
        rencana_magang: data.rencana_magang,
        mhsId: req.mhsId,
      });

      res.status(201).json({
        message: "Successfully submitted the supervisor's plot",
        data: plotingDospem,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR CREATE PLOTING DOSEN PEMBIMBING --------------------------- //

  // ---------------- START FITUR UPDATE PLOTING DOSEN PEMBIMBING --------------------------- //

  updateDosenPembimbing: async (req, res) => {
    const { id } = req.params;

    try {
      const dospem = await DosenPembimbing.findOne({
        where: {
          id,
        },
      });

      if (!dospem) {
        return res.status(404).json({
          message: "Tidak ada pengajuan dosen pembimbing!",
        });
      }

      const data = req.body;

      await DosenPembimbing.update(
        {
          nama: data.nama,
          npm: data.npm,
          surat_covid: data.surat_covid,
          surat_balasan: data.surat_balasan,
          tempat_magang: data.tempat_magang,
          alamat_magang: data.alamat_magang,
          pic: data.pic,
          kontak_pic: data.kontak_pic,
          latitude_magang: data.latitude_magang,
          longitude_magang: data.longitude_magang,
          tgl_mulai: data.tgl_mulai,
          tgl_selesai: data.tgl_selesai,
          bidang_minat: data.bidang_minat,
          rencana_magang: data.rencana_magang,
          mhsId: req.mhsId,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Successfully updated the supervisor's plot",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR UPDATE PLOTING DOSEN PEMBIMBING ----------------------------- //

  // ---------------- START FITUR DELETE PLOTING DOSEN PEMBIMBING ----------------------------- //

  deleteDospem: async (req, res) => {
    const { id } = req.params;

    try {
      await DosenPembimbing.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Successufly deteled the suprevisor's plot",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------- END FITUR DELETE PLOTING DOSEN PEMBIMBING ------------------------------- //
};
