const cardService = require("../services/cardService");
const { Card } = require("../Domain/Card");

async function getAllCards(req, res, next) {
  try {
    const fetchedCards = await cardService.fetchAllCards();
    res.status(200).send(fetchedCards);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
}

async function createCard(req, res, next) {
  try {
    const card = new Card(
      req.body.id,
      req.body.author,
      req.body.last_updated,
      req.body.content,
      req.body.category,
    );
    await cardService.createCard(card);
    res.status(201).send("succefully created new card");
  } catch (err) {
    res.status(404).send("creating card failed");
  }
}

module.exports = {
  getAllCards,
  createCard,
};
