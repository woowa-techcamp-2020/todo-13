const Activity = require("../Domain/Activity");
const ActivityRepository = require("../Repository/ActivityRepository");
const ActivityService = require("../services/acitivity-service");
const db = require("../db");

async function getAllActivities(req, res, next) {
  try {
      const activityRepositoryInstance = new ActivityRepository(Activity, db);
      const activityServiceInstance = new ActivityService(activityRepositoryInstance);

      const fetchedActivities = await activityServiceInstance.fetchAllActivities();

      res.status(200).send(fetchAllActivities);
  } catch (error) {
    console.error(error);
    res.status(404).end();
  }
}

async function createActivity(req, res, next) {
    try {
        const activity = new Activity({
            id: req.body.id,
            userid: req.body.userid,
            content: req.body.content,
            created_at: req.body.created_at,
        });

        const activityRepositoryInstance = new ActivityRepository(Activity, db);
        const activityServiceInstance = new ActivityService(activityRepositoryInstance);

        await activityServiceInstance.createActivity();

        res.status(201).send("creating activity successed");
    } catch (error) {
        console.error(error);
        res.status(404).send("creating activity has failed");
    }
}

module.exports = {
    getAllActivities,
    createActivity,
}