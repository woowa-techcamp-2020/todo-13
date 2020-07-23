const express = require("express");
const router = express.Router();

const columnController = require("../controllers/column-controller");

router.get("/", columnController.getAllColumnName);
router.put("/", columnController.editColumnName);

module.exports = router;
