const db = require("../db");
const Card = require("../Domain/Card");

async function findAllCards() {
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

async function createCard(cardDTO) {
  const query =
    "INSERT INTO todo.Cards\
  (id, author, last_updated, content, category)\
  VALUES (?, ?, ?, ?, ?)";
  const values = Object.values(cardDTO);
  try {
    await db.query(query, values);
  } catch (err) {
    throw err;
  }
}

// TODO: findCardById, updateCardById, remove 구현

module.exports = {
  findAllCards,
  createCard,
};
