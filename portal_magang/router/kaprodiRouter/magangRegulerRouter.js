const express = require("express");
const { verifyUserToken, verifyKaprodi } = require("../../middleware/auth");
const {
  getMagangRegulerByID,
} = require("../../controllers/mahasiswaControllers/magangReguler");
const {
  updateMagangKaprodi,
  getAllMagangRegulerKaprodi,
} = require("../../controllers/kaprodi/updateMagang");
const router = express.Router();

router.get(
  "/magang-reguler",
  verifyUserToken,
  verifyKaprodi,
  getAllMagangRegulerKaprodi
);
router.get(
  "/magang-reguler/:id",
  verifyUserToken,
  verifyKaprodi,
  getMagangRegulerByID
);
router.put(
  "/magang-reguler/:id",
  verifyUserToken,
  verifyKaprodi,
  updateMagangKaprodi
);

module.exports = router;
