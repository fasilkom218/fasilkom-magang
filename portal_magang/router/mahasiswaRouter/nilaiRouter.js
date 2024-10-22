const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../../middleware/verifyToken");
const {
  getNilaiMhs,
  getNilaiMhsById,
  getBobotMhs,
  getBobotById,
} = require("../../controllers/mahasiswaControllers/nilaiControllers");

router.get("/nilai", VerifyToken, getNilaiMhs);
router.get("/nilai/:id", VerifyToken, getNilaiMhsById);
router.get("/bobot", VerifyToken, getBobotMhs);
router.get("/bobot/:id", VerifyToken, getBobotById);

module.exports = router;
