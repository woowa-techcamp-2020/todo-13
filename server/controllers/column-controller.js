const Column = require("../domain/column");
const ColumnRepository = require("../repository/column-repository");
const ColumnService = require("../services/column-service");
const db = require("../db");

async function getAllColumns(req, res, next) {
  try {
    const columnRepositoryInstance = new ColumnRepository(Column, db);
    const columnServiceInstance = new ColumnService(columnRepositoryInstance);

    const columns = columnServiceInstance.fetchAllColumns();

    res.status(200).json(columns);
  } catch (error) {
    console.error(error);
    res.status(404).end();
  }
}

async function editColumnName(req, res, next) {
  try {
    const columnRepositoryInstance = new ColumnRepository(Column, db);
    const columnServiceInstance = new ColumnService(columnRepositoryInstance);

    if (!req.body.content) {
      res.status(400).json({ message: "Bad request" });
      return;
    }

    const column = new Column(req.body);
    await columnServiceInstance.editColumnName(id, column);

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
