const express = require("express");
const { verifyUserToken, verifyKaprodi } = require("../../middleware/auth");
const {
  getMagangKompetensiByID,
} = require("../../controllers/mahasiswaControllers/magangKompetensi");
const {
  updateMagangKomptensiKaprodi,
  getAllMagangKompetensiKaprodi,
} = require("../../controllers/kaprodi/updateMagang");
const router = express.Router();

router.get(
  "/magang-kompetensi",
  verifyUserToken,
  verifyKaprodi,
  getAllMagangKompetensiKaprodi
);
router.get(
  "/magang-kompetensi/:id",
  verifyUserToken,
  verifyKaprodi,
  getMagangKompetensiByID
);
router.put(
  "/magang-kompetensi/:id",
  verifyUserToken,
  verifyKaprodi,
  updateMagangKomptensiKaprodi
);

module.exports = router;
