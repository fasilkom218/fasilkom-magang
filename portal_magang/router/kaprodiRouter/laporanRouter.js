const express = require("express");
const { verifyUserToken, verifyKaprodi } = require("../../middleware/auth");
const {
  getLaporanKaprodi,
  getLaporanKaprodiById,
} = require("../../controllers/kaprodi/laporanControllers");
const router = express.Router();

router.get("/laporan", verifyUserToken, verifyKaprodi, getLaporanKaprodi);
router.get(
  "/laporan/:id",
  verifyUserToken,
  verifyKaprodi,
  getLaporanKaprodiById
);

module.exports = router;
