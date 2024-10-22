const express = require("express");
const { VerifyToken } = require("../../middleware/verifyToken");
const {
  getAllMagangReguler,
  getMagangRegulerByID,
  createMagangReguler,
  updateMagangReguler,
  deleteMagangReguler,
} = require("../../controllers/mahasiswaControllers/magangReguler");
const router = express.Router();

router.get("/magang-reguler", VerifyToken, getAllMagangReguler);
router.get("/magang-reguler/:id", VerifyToken, getMagangRegulerByID);
router.post("/magang-reguler", VerifyToken, createMagangReguler);
router.put("/magang-reguler/:id", VerifyToken, updateMagangReguler);
router.delete("/magang-reguler/:id", VerifyToken, deleteMagangReguler);

module.exports = router;
