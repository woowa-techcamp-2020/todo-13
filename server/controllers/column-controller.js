const Column = require("../domain/column");
const ColumnRepository = require("../repository/column-repository");
const ColumnService = require("../services/column-service");
const Activity = require("../domain/activity");
const ActivityRepository = require("../repository/activity-repository");
const db = require("../db");

async function getAllColumns(req, res, next) {
  try {
    const columnRepositoryInstance = new ColumnRepository(Column, db);
    const columnServiceInstance = new ColumnService(columnRepositoryInstance);

    const columns = await columnServiceInstance.fetchAllColumns();

    res.status(200).json(columns);
  } catch (error) {
    console.error(error);
    res.status(404).end();
  }
}

async function editColumnName(req, res, next) {
  try {
    const columnRepositoryInstance = new ColumnRepository(Column, db);
    const activityRepositoryInstance = new ActivityRepository(Activity, db);
    const columnServiceInstance = new ColumnService(columnRepositoryInstance, activityRepositoryInstance);

    if (!req.body.column_name) {
      res.status(400).json({ message: "Bad request" });
      return;
    }

    const column = new Column(req.body);
    await columnServiceInstance.editColumnName(req.params.id, req.body.username, column);

    res.status(200).json({ message: "succefully updated column name" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "update column name has failed" });
  }
}

module.exports = {
  getAllColumns,
  editColumnName,
};
