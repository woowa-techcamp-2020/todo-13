const cardDAO = require("../DAO/cardDAO");
const { Card } = require("../models/Card");

async function fetchAllCards() {
  const fetchedCards = await cardDAO.fetchAllCards();
  const cards = fetchedCards.map(fetchedCard => {
      return new Card(
          fetchedCard.id,
          fetchedCard.author,
          fetchedCard.last_updated,
          fetchedCard.content,
          fetchedCard.category
      );
  })
  
  return cards;
}

module.exports = {
  fetchAllCards,
};
