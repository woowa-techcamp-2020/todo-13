const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activity-controller");

router.get("/", activityController.fetchAllActivities);
router.post("/", activityController.createActivity);

module.exports = router;
