const db = require("../db");
const mysql = require("mysql2");
const { Card } = require("../Domain/Card");

async function fetchAllCards() {
  const [rows] = await db.query("SELECT * FROM todo.Cards");
  const cards = rows.map((row) => {
    return new Card(
      row.id,
      row.author,
      row.last_updated,
      row.content,
      row.category
    );
  });
  return cards;
}

async function createCard(card) {
  const query = `INSERT INTO todo.Cards (id, author, last_updated, content, category)\
   VALUES (${parseInt(card.id)},\
    \'${card.author}\',\
    \'${card.last_updated}\',\
    \'${card.content}\',\
    \'${card.category}\')`; 
  try {
    await db.query(query);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchAllCards,
  createCard,
};
