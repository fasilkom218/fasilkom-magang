const express = require("express");
const router = express.Router();
const { verifyUserToken, verifyAdmin } = require("../../middleware/auth");
const {
  getLaporanAdmin,
  getLaporanByIDAdmin,
  deleteLaporan,
} = require("../../controllers/mahasiswaControllers/laporanMagangControllers");

router.get("/laporan", verifyUserToken, verifyAdmin, getLaporanAdmin);
router.get("/laporan/:id", verifyUserToken, verifyAdmin, getLaporanByIDAdmin);
router.delete("/laporan/:id", verifyUserToken, verifyAdmin, deleteLaporan);

module.exports = router;
