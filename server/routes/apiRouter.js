const express = require("express");
const router = express.Router();

const cardRouter = require('./cardRouter');

router.use("/card", cardRouter);

module.exports = router;