const CardService = require("../services/card-service");
const Card = require("../domain/card");
const CardRepository = require("../repository/card-repository");
const db = require("../db");

async function getAllCards(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    const fetchedCards = await cardServiceInstance.fetchAllCards();

    res.status(200).send(fetchedCards);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
}

async function getOneCard(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    const fetchedCard = await cardServiceInstance.fetchOneCard(req.params.id);

    res.status(200).send(fetchedCard);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
}

async function createCard(req, res, next) {
  try {
    const card = new Card(req.body);
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    await cardServiceInstance.createCard(card);

    res.status(201).send("succefully created new card");
  } catch (err) {
    console.error(err);
    res.status(404).send("creating card failed");
  }
}

async function updateCard(req, res, next) {
    try {
      const cardRepositoryInstance = new CardRepository(Card, db);
      const cardServiceInstance = new CardService(cardRepositoryInstance);
      if (!req.body.content) res.status(204).send("No content");

      const card = new Card(req.body);
      
      await cardServiceInstance.updateCard(req.params.id, card);
      res.status(200).send("succefully update card");
    } catch (err) {
      console.error(err);
      res.status(404).send("update card failed");
    }
}
  
async function deleteOneCard(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);
    await cardServiceInstance.removeCard(req.params.id);

    res.status(201).send("succefully delete card");
  } catch (err) {
    console.error(err);
    res.status(404).end();

  }
}

module.exports = {
  getAllCards,
  createCard,
  getOneCard,
  updateCard,
  deleteOneCard,
};
