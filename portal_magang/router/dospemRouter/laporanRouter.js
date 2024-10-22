const express = require("express");
const router = express.Router();
const { verifyUserToken, verifyDosen } = require("../../middleware/auth");
const {
  getLaporanDospem,
  getLaporanDospemById,
  reviewLaporan,
} = require("../../controllers/dospemControllers/laporanControllers");

router.get("/laporan", verifyUserToken, verifyDosen, getLaporanDospem);
router.get("/laporan/:id", verifyUserToken, verifyDosen, getLaporanDospemById);
router.put("/laporan/:id", verifyUserToken, verifyDosen, reviewLaporan);

module.exports = router;
