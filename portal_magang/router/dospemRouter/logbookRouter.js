const express = require("express");
const router = express.Router();
const { verifyUserToken, verifyDosen } = require("../../middleware/auth");
const {
  getLogbookDospemAll,
  getLogbookDospemById,
  reviewLogbook,
} = require("../../controllers/dospemControllers/logbookDospemControllers");

router.get("/logbook", verifyUserToken, verifyDosen, getLogbookDospemAll);
router.get("/logbook/:id", verifyUserToken, verifyDosen, getLogbookDospemById);
router.put("/logbook/:id", verifyUserToken, verifyDosen, reviewLogbook);

module.exports = router;
