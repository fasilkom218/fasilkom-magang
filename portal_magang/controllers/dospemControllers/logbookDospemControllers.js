const Logbook = require("../../models").Logbook;
const Mahasiswa = require("../../models").Mahasiswa;
const User = require("../../models").User;

module.exports = {
  // ---------------------- START FITUR GET ALL LOGBOOK FOR DOSPEM ------------------------------------ //

  getLogbookDospemAll: async (req, res) => {
    try {
      const logbook = await Logbook.findAll({
        where: {
          dospemId: req.userId,
        },
        attributes: [
          "id",
          "title",
          "desc",
          "dateOfPosting",
          "comment",
          "status",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: ["id", "name", "email", "profile_pict", "no_hp"],
          },
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
        oreder: [["dateOfPosting", "DESC"]],
      });

      if (!logbook) {
        return res.status(404).json({
          message: "Tidak ada data logbook yang tersedia",
        });
      }

      res.status(200).json({
        message: "Success get all data logbook",
        data: logbook,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------------- END FITUR GET ALL LOGBOOK FOR MITRA -------------------------------------- //

  // ---------------------- START FITUR GET LOGBOOK FOR DOSPEM -------------------------------------- //

  getLogbookDospemById: async (req, res) => {
    try {
      const id = req.params.id;

      const logbook = await Logbook.findOne({
        where: {
          id,
        },
        attributes: [
          "id",
          "title",
          "desc",
          "dateOfPosting",
          "comment",
          "status",
        ],
        include: [
          {
            model: Mahasiswa,
            attributes: ["id", "name", "email", "profile_pict", "no_hp"],
          },
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
        oreder: [["dateOfPosting", "DESC"]],
      });

      if (!logbook) {
        return res.status(404).json({
          message: "Data logbook yang anda cari tidak tersedia!",
        });
      }

      res.status(200).json({
        message: "Success get data logbook",
        data: logbook,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------------- END FITUR GET LOGBOOK FOR MITRA BY ID ---------------------------------------- //

  // ---------------------- START FITUR REVIEW LOGBOOK BY DOSPEM -------------------------------------- //
  reviewLogbook: async (req, res) => {
    const { id } = req.params;
    const { status, comment } = req.body;

    const logbook = await Logbook.findOne({
      where: {
        id,
      },
    });

    if (!logbook) {
      return res.status(404).json({
        message: "Tidak ada data logbook yang tersedia!",
      });
    }

    try {
      if (status === "accepted") {
        await Logbook.update(
          {
            status,
            comment: null,
          },
          {
            where: {
              id,
            },
          }
        );
      } else {
        await Logbook.update(
          {
            status,
            comment,
          },
          {
            where: {
              id,
            },
          }
        );
      }

      res.status(201).json({
        message: "Success update data logbook",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ---------------------- END FITUR REVIEW LOGBOOK BY DOSPEM -------------------------------------- //
};
