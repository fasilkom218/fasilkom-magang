const express = require("express");
const router = express.Router();

const editRouter = require("./editProfileRouter");
const jobRouter = require("./uploadJobRouter");
const handleJobRouter = require("./handleJobRouter");

router.use("/tim", editRouter);
router.use("/tim", jobRouter);
router.use("/tim", handleJobRouter);

module.exports = router;
