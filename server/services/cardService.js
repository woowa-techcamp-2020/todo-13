class CardService {
  constructor(CardRepository) {
    this.CardRepository = CardRepository;
  }

  async fetchAllCards() {
    const cards = await this.CardRepository.findAllCards();
    return cards;
  }

  async fetchOneCard(id) {
    const card = await this.CardRepository.findCardById(id);
    return card;
  }

  async createCard(cardDTO) {
    try {
      await this.CardRepository.createCard(cardDTO);
    } catch (err) {
      throw err;
    }
  }

  async updateCard(id, cardDTO) {
    try {
      await this.CardRepository.updateCardById(id, cardDTO);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CardService;
