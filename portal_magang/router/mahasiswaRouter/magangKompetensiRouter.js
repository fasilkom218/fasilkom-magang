const express = require("express");
const { VerifyToken } = require("../../middleware/verifyToken");
const {
  getAllMagangKompetensi,
  getMagangKompetensiByID,
  createMagangKompetensi,
  updateMagangKompetensi,
  deleteMagangKompetensi,
} = require("../../controllers/mahasiswaControllers/magangKompetensi");
const router = express.Router();

router.get("/magang-kompetensi", VerifyToken, getAllMagangKompetensi);
router.get("/magang-kompetensi/:id", VerifyToken, getMagangKompetensiByID);
router.post("/magang-kompetensi", VerifyToken, createMagangKompetensi);
router.put("/magang-kompetensi/:id", VerifyToken, updateMagangKompetensi);
router.delete("/magang-kompetensi/:id", VerifyToken, deleteMagangKompetensi);

module.exports = router;
