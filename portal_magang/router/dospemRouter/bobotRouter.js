const express = require("express");
const { verifyUserToken, verifyDosen } = require("../../middleware/auth");
const {
  getBobot,
  getBobotById,
} = require("../../controllers/dospemControllers/nilaiMagangControllers");
const router = express.Router();

router.get("/bobot", verifyUserToken, verifyDosen, getBobot);
router.get("/bobot/:id", verifyUserToken, verifyDosen, getBobotById);

module.exports = router;
