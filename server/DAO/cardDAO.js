const mysql = require("mysql2/promise");

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
  });

  return connection;
};

async function fetchAllCards() {
  const connection = await getConnection();

  const [rows] = await connection.query("SELECT * FROM todo.Cards");
  return rows;
}

module.exports = {
  fetchAllCards,
};
