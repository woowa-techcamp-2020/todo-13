class CardService {
  constructor(CardRepository) {
    this.CardRepository = CardRepository;
  }

  async fetchAllCards() {
    const cards = await this.CardRepository.findAllCards();
    return cards;
  }

  async createCard(cardDTO) {
    try {
      await this.CardRepository.createCard(cardDTO);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CardService;
