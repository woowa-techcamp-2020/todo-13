const cardDAO = require("../DAO/cardDAO");

async function fetchAllCards() {
  const cards = await cardDAO.fetchAllCards();
  return cards;
}

async function createCard(card) {
  try {
    await cardDAO.createCard(card);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchAllCards,
  createCard,
};
