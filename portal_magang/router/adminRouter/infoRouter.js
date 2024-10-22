const express = require("express");
const router = express.Router();

const {
  createInfo,
  getAllInfo,
  getInfoById,
  updateInfo,
  deleteInfo,
} = require("../../controllers/adminControllers/informationControllers");

const { verifyUserToken, verifyAdmin } = require("../../middleware/auth");

router.get("/articles", verifyUserToken, verifyAdmin, getAllInfo);
router.get("/articles/:id", verifyUserToken, verifyAdmin, getInfoById);
router.post("/articles", verifyUserToken, verifyAdmin, createInfo);
router.put("/articles/:id", verifyUserToken, verifyAdmin, updateInfo);
router.delete("/articles/:id", verifyUserToken, verifyAdmin, deleteInfo);

module.exports = router;
