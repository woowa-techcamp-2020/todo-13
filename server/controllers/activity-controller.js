const Activity = require("../domain/activity");
const ActivityRepository = require("../repository/activity-repository");
const ActivityService = require("../services/activity-service");
const db = require("../db");

async function getAllActivities(req, res, next) {
  try {
    const activityRepositoryInstance = new ActivityRepository(Activity, db);
    const activityServiceInstance = new ActivityService(
      activityRepositoryInstance
    );

    const fetchedActivities = await activityServiceInstance.fetchAllActivities();

    res.status(200).json(fetchedActivities);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllActivities,
};
