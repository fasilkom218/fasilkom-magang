const express = require("express");
const router = express.Router();
const usersRouter = require("./usersRouter");
const authRouter = require("./authRouter");
const infoRouter = require("./infoRouter");
const laporanMagang = require("./laporanMagangAdmin");
const magang = require("./pengajuanMagangRouter");

router.use("/admin", infoRouter);
router.use("/admin", usersRouter);
router.use("/auth", authRouter);
router.use("/admin", laporanMagang);
router.use("/admin", magang);

module.exports = router;
