const express = require("express");
const { VerifyToken } = require("../../middleware/verifyToken");
const {
  getAllBimbinganMhs,
  getBimbinganMhsById,
} = require("../../controllers/mahasiswaControllers/mhsBimbinganControllers");
const router = express.Router();

router.get("/bimbingan", VerifyToken, getAllBimbinganMhs);
router.get("/bimbingan/:id", VerifyToken, getBimbinganMhsById);

module.exports = router;
