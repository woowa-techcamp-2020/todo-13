const cardService = require("../services/cardService");

async function getAllCards(req, res, next) {
    try {
        const fetchedCards = await cardService.fetchAllCards();
        res.status(200).send(fetchedCards);
    } catch {
        res.status(404).end();
    }
}

module.exports = {
  getAllCards,
};
