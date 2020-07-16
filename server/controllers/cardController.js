const CardService = require("../services/cardService");
const Card = require("../Domain/Card");
const CardRepository = require("../Repository/CardRepository")

async function getAllCards(req, res, next) {
  try {
    const cardServiceInstance = new CardService(CardRepository);
    const fetchedCards = await cardServiceInstance.fetchAllCards();
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
      req.body.category
    );
    const cardServiceInstance = new CardService(CardRepository);
    await cardServiceInstance.createCard(card);
    res.status(201).send("succefully created new card");
  } catch (err) {
    console.error(err);
    res.status(404).send("creating card failed");
  }
}

module.exports = {
  getAllCards,
  createCard,
};
