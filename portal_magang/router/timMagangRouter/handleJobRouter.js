const express = require("express");
const router = express.Router();
const {
  getParticularJob,
  updateStatus,
  getApplicants,
  getListFinal,
  getApplicantsByID,
} = require("../../controllers/timMagangControllers/handleJobController");
const { verifyUserToken, verifyTimMagang } = require("../../middleware/auth");

router.get(
  "/applicants/:id",
  verifyUserToken,
  verifyTimMagang,
  getParticularJob
);
router.get("/applicants", verifyUserToken, verifyTimMagang, getListFinal);
router.get("/applications", verifyUserToken, verifyTimMagang, getApplicants);
router.get(
  "/applications/:id",
  verifyUserToken,
  verifyTimMagang,
  getApplicantsByID
);
router.put(
  "/applications/status/:id",
  verifyUserToken,
  verifyTimMagang,
  updateStatus
);

module.exports = router;
