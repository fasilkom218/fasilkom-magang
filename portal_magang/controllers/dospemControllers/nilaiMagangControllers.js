const Nilai = require("../../models").Nilai;
const Bobot = require("../../models").Bobot;
const User = require("../../models").User;
const Mahasiswa = require("../../models").Mahasiswa;

module.exports = {
  // ------------------------------ START GET ALL NILAI MAGANG ------------------------------ //
  getNilai: async (req, res) => {
    try {
      const nilai = await Nilai.findAll({
        where: {
          userId: req.userId,
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
              "npm",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkCV",
              "linkRekom",
              "desc",
            ],
          },
          {
            model: User,
            attributes: [
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

      if (nilai.length === 0) {
        return res.status(404).json({
          message: "Tidak ada data nilai",
        });
      }

      res.status(200).json({
        message: "Success get all data nilai",
        data: nilai,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET ALL NILAI MAGANG ------------------------------ //

  // ------------------------------ START GET NILAI MAGANG BY ID ------------------------------ //
  getNilaiById: async (req, res) => {
    const { id } = req.params;

    try {
      const nilai = await Nilai.findOne({
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
              "npm",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkCV",
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

      if (!nilai) {
        return res.status(404).json({
          message: "Tidak ada data nilai",
        });
      }

      res.status(200).json({
        message: "Success get data nilai by id",
        data: nilai,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET NILAI MAGANG BY ID ------------------------------ //

  // ------------------------------ START CREATE NILAI MAGANG ------------------------------ //
  createNilai: async (req, res) => {
    const data = req.body;

    try {
      const nilai = await Nilai.create({
        disiplin: data.disiplin,
        sikap: data.sikap,
        tanggung_jawab: data.tanggung_jawab,
        kehadiran: data.kehadiran,
        tata_tertib: data.tata_tertib,
        penampilan: data.penampilan,
        kemampuan_kerja: data.kemampuan_kerja,
        keterampilan_kerja: data.keterampilan_kerja,
        kualitas_kerja: data.kualitas_kerja,
        kemampuan_berkomunikasi: data.kemampuan_berkomunikasi,
        kerjasama: data.kerjasama,
        kerajinan: data.kerajinan,
        percaya_diri: data.percaya_diri,
        relevansi: data.relevansi,
        isi_laporan: data.isi_laporan,
        total:
          Number(data.disiplin) +
          Number(data.sikap) +
          Number(data.tanggung_jawab) +
          Number(data.kehadiran) +
          Number(data.tata_tertib) +
          Number(data.penampilan) +
          Number(data.kemampuan_kerja) +
          Number(data.keterampilan_kerja) +
          Number(data.kualitas_kerja) +
          Number(data.kemampuan_berkomunikasi) +
          Number(data.kerjasama) +
          Number(data.kerajinan) +
          Number(data.percaya_diri) +
          Number(data.relevansi) +
          Number(data.isi_laporan),
        mhsId: data.mhsId,
        userId: req.userId,
      });

      await Bobot.create({
        disiplin: data.disiplin * 0.05,
        sikap: data.sikap * 0.05,
        tanggung_jawab: data.tanggung_jawab * 0.05,
        kehadiran: data.kehadiran * 0.05,
        tata_tertib: data.tata_tertib * 0.05,
        penampilan: data.penampilan * 0.05,
        kemampuan_kerja: data.kemampuan_kerja * 0.05,
        keterampilan_kerja: data.keterampilan_kerja * 0.05,
        kualitas_kerja: data.kualitas_kerja * 0.05,
        kemampuan_berkomunikasi: data.kemampuan_berkomunikasi * 0.05,
        kerjasama: data.kerjasama * 0.05,
        kerajinan: data.kerajinan * 0.05,
        percaya_diri: data.percaya_diri * 0.05,
        relevansi: data.relevansi * 0.1,
        isi_laporan: data.isi_laporan * 0.25,
        total:
          data.disiplin * 0.05 +
          data.sikap * 0.05 +
          data.tanggung_jawab * 0.05 +
          data.kehadiran * 0.05 +
          data.tata_tertib * 0.05 +
          data.penampilan * 0.05 +
          data.kemampuan_kerja * 0.05 +
          data.keterampilan_kerja * 0.05 +
          data.kualitas_kerja * 0.05 +
          data.kemampuan_berkomunikasi * 0.05 +
          data.kerjasama * 0.05 +
          data.kerajinan * 0.05 +
          data.percaya_diri * 0.05 +
          data.relevansi * 0.1 +
          data.isi_laporan * 0.25,
        nilaiId: nilai.id,
        mhsId: nilai.mhsId,
        userId: req.userId,
      });

      res.status(201).json({
        message: "Success create data nilai",
        data: nilai,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END CREATE NILAI MAGANG ------------------------------ //

  // ------------------------------ START UPDATE NILAI MAGANG BY ID ------------------------------ //
  updateNilai: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const nilai = await Nilai.findOne({
      where: {
        id,
      },
    });

    if (!nilai) {
      return res.status(404).json({
        message: "Tidak ada data nilai",
      });
    }

    try {
      await Nilai.update(
        {
          disiplin: data.disiplin,
          sikap: data.sikap,
          tanggung_jawab: data.tanggung_jawab,
          kehadiran: data.kehadiran,
          tata_tertib: data.tata_tertib,
          penampilan: data.penampilan,
          kemampuan_kerja: data.kemampuan_kerja,
          keterampilan_kerja: data.keterampilan_kerja,
          kualitas_kerja: data.kualitas_kerja,
          kemampuan_berkomunikasi: data.kemampuan_berkomunikasi,
          kerjasama: data.kerjasama,
          kerajinan: data.kerajinan,
          percaya_diri: data.percaya_diri,
          relevansi: data.relevansi,
          isi_laporan: data.isi_laporan,
          total:
            Number(data.disiplin) +
            Number(data.sikap) +
            Number(data.tanggung_jawab) +
            Number(data.kehadiran) +
            Number(data.tata_tertib) +
            Number(data.penampilan) +
            Number(data.kemampuan_kerja) +
            Number(data.keterampilan_kerja) +
            Number(data.kualitas_kerja) +
            Number(data.kemampuan_berkomunikasi) +
            Number(data.kerjasama) +
            Number(data.kerajinan) +
            Number(data.percaya_diri) +
            Number(data.relevansi) +
            Number(data.isi_laporan),
          mhsId: data.mhsId,
          userId: req.userId,
        },
        {
          where: {
            id,
          },
        }
      );

      await Bobot.update(
        {
          disiplin: data.disiplin * 0.05,
          sikap: data.sikap * 0.05,
          tanggung_jawab: data.tanggung_jawab * 0.05,
          kehadiran: data.kehadiran * 0.05,
          tata_tertib: data.tata_tertib * 0.05,
          penampilan: data.penampilan * 0.05,
          kemampuan_kerja: data.kemampuan_kerja * 0.05,
          keterampilan_kerja: data.keterampilan_kerja * 0.05,
          kualitas_kerja: data.kualitas_kerja * 0.05,
          kemampuan_berkomunikasi: data.kemampuan_berkomunikasi * 0.05,
          kerjasama: data.kerjasama * 0.05,
          kerajinan: data.kerajinan * 0.05,
          percaya_diri: data.percaya_diri * 0.05,
          relevansi: data.relevansi * 0.1,
          isi_laporan: data.isi_laporan * 0.25,
          total:
            data.disiplin * 0.05 +
            data.sikap * 0.05 +
            data.tanggung_jawab * 0.05 +
            data.kehadiran * 0.05 +
            data.tata_tertib * 0.05 +
            data.penampilan * 0.05 +
            data.kemampuan_kerja * 0.05 +
            data.keterampilan_kerja * 0.05 +
            data.kualitas_kerja * 0.05 +
            data.kemampuan_berkomunikasi * 0.05 +
            data.kerjasama * 0.05 +
            data.kerajinan * 0.05 +
            data.percaya_diri * 0.05 +
            data.relevansi * 0.1 +
            data.isi_laporan * 0.25,
        },
        {
          where: {
            nilaiId: id,
          },
        }
      );

      res.status(200).json({
        message: "Success update data nilai",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END UPDATE NILAI MAGANG BY ID ------------------------------ //

  // ------------------------------ START DELETE NILAI MAGANG BY ID ------------------------------ //
  deleteNilai: async (req, res) => {
    const { id } = req.params;
    try {
      await Nilai.destroy({
        where: {
          id,
        },
      });

      await Bobot.destroy({
        where: {
          nilaiId: id,
        },
      });

      res.status(200).json({
        message: "Success delete data nilai",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END DELETE NILAI MAGANG BY ID ------------------------------ //

  // ------------------------------ START GET ALL NILAI MAGANG ------------------------------ //
  getBobot: async (req, res) => {
    try {
      const bobot = await Bobot.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Nilai,
          },
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "npm",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkCV",
              "linkRekom",
              "desc",
            ],
          },
          {
            model: User,
            attributes: [
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

      if (bobot.length === 0) {
        return res.status(404).json({
          message: "Tidak ada data bobot",
        });
      }

      res.status(200).json({
        message: "Success get all data bobot",
        data: bobot,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET ALL NILAI MAGANG ------------------------------ //

  // ------------------------------ START GET NILAI MAGANG BY ID ------------------------------ //
  getBobotById: async (req, res) => {
    const { id } = req.params;

    try {
      const bobot = await Bobot.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Nilai,
          },
          {
            model: Mahasiswa,
            attributes: [
              "name",
              "email",
              "profile_pict",
              "prodi",
              "semester",
              "npm",
              "tgl_lahir",
              "alamat",
              "no_hp",
              "linkCV",
              "linkRekom",
              "desc",
            ],
          },
          {
            model: User,
            attributes: [
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

      if (!bobot) {
        return res.status(404).json({
          message: "Tidak ada data bobot",
        });
      }

      res.status(200).json({
        message: "Success get data bobot by id",
        data: bobot,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ------------------------------ END GET NILAI MAGANG BY ID ------------------------------ //
};
