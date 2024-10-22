const express = require("express");
const {
  getAllBimbingan,
  getBimbinganById,
} = require("../../controllers/dospemControllers/bimbinganControllers");
const { verifyUserToken, verifyDosen } = require("../../middleware/auth");
const router = express.Router();

router.get("/bimbingan", verifyUserToken, verifyDosen, getAllBimbingan);
router.get("/bimbingan/:id", verifyUserToken, verifyDosen, getBimbinganById);

module.exports = router;
