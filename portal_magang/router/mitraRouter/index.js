const express = require("express");
const router = express.Router();
const nilai = require("./nilaiRouter");
const editProfile = require("./editProfileRouter");

router.use("/mitra", nilai);
router.use("/mitra", editProfile);

module.exports = router;
