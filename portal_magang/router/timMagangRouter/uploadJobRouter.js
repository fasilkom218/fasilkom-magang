const express = require("express");
const router = express.Router();
const {
  getJobById,
  addJobs,
  getAllJob,
  updateJob,
  deleteJob,
} = require("../../controllers/timMagangControllers/uploadJob");
const { verifyUserToken, verifyTimMagang } = require("../../middleware/auth");

router.get("/job", verifyUserToken, verifyTimMagang, getAllJob);
router.get("/job/:id", verifyUserToken, verifyTimMagang, getJobById);
router.post("/job", verifyUserToken, verifyTimMagang, addJobs);
router.put("/job/:id", verifyUserToken, verifyTimMagang, updateJob);
router.delete("/job/:id", verifyUserToken, verifyTimMagang, deleteJob);

module.exports = router;
