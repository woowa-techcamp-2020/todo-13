require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
});

connection.connect((e) => {
  if (e) {
    console.error(e);
    return process.exit(22);
  }
  console.log("DB connection established!");
});

app.get("/", (req, res) => res.send("Hello World! Docker setup done~~~"));

app.get("/card", (req, res) => {
  connection.query("SELECT * FROM todo.Cards", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
