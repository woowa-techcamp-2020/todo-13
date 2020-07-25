const express = require("express");
const router = express.Router();

const cardRouter = require('./card-router');
const activityRouter = require("./activity-router");
const columnRouter = require("./column-router");

router.use("/card", cardRouter);
router.use("/activity", activityRouter);
router.use("/column", columnRouter);

module.exports = router;
