const express = require("express");
const { verifyUserToken, verifyAdmin } = require("../../middleware/auth");
const {
  getAllMagangRegulerAdmin,
  getAllMagangKompetensiAdmin,
} = require("../../controllers/adminControllers/pengajuanMagang");
const {
  getMagangRegulerByID,
} = require("../../controllers/mahasiswaControllers/magangReguler");
const {
  getMagangKompetensiByID,
} = require("../../controllers/mahasiswaControllers/magangKompetensi");
const router = express.Router();

router.get(
  "/magang-reguler",
  verifyUserToken,
  verifyAdmin,
  getAllMagangRegulerAdmin
);
router.get(
  "/magang-reguler/:id",
  verifyUserToken,
  verifyAdmin,
  getMagangRegulerByID
);
router.get(
  "/magang-kompetensi",
  verifyUserToken,
  verifyAdmin,
  getAllMagangKompetensiAdmin
);
router.get(
  "/magang-kompetensi/:id",
  verifyUserToken,
  verifyAdmin,
  getMagangKompetensiByID
);

module.exports = router;
