const express = require("express");
const { verifyUserToken, verifyMitra } = require("../../middleware/auth");
const {
  getNilai,
  getNilaiById,
  createNilai,
  updateNilai,
  deleteNilai,
  getBobot,
  getBobotById,
} = require("../../controllers/dospemControllers/nilaiMagangControllers");
const {
  getMahasiswa,
} = require("../../controllers/mahasiswaControllers/mahasiswaControllers");
const {
  getAllBimbinganMitra,
} = require("../../controllers/dospemControllers/bimbinganControllers");
const router = express.Router();

router.get("/nilai", verifyUserToken, verifyMitra, getNilai);
router.get("/nilai/:id", verifyUserToken, verifyMitra, getNilaiById);
router.post("/nilai", verifyUserToken, verifyMitra, createNilai);
router.put("/nilai/:id", verifyUserToken, verifyMitra, updateNilai);
router.delete("/nilai/:id", verifyUserToken, verifyMitra, deleteNilai);

router.get("/bobot", verifyUserToken, verifyMitra, getBobot);
router.get("/bobot/:id", verifyUserToken, verifyMitra, getBobotById);

router.get("/mahasiswa", verifyUserToken, verifyMitra, getAllBimbinganMitra);

module.exports = router;
