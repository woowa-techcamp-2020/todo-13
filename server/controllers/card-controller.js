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
    res.status(404).end();
  }
}

async function getLatestCardId(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    const latestId = await cardServiceInstance.getLatestId();
    res.status(200).json({ latestId: latestId });
  } catch (error) {
    res.status(404).json({ message: "retrieving latest cardId failed" });
  }
}

async function createCard(req, res, next) {
  try {
    const card = new Card(req.body);
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    console.log(card);
    await cardServiceInstance.createCard(card);

    res.status(201).json({ message: "succefully created new card" });
  } catch (err) {
    res.status(404).json({ message: "creating card failed" });
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

async function moveCard(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    await cardServiceInstance.moveCard(req.params.id, req.body.data);

    res.status(203).json({"message": "card moved!"});
  } catch (error) {
    console.error(error);
    res.status(404).end();
  }
}

module.exports = {
  getAllCards,
  createCard,
  getOneCard,
  getLatestCardId,
  updateCard,
  deleteOneCard,
  moveCard
};
