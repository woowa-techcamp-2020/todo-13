class CardService {
  constructor(CardRepository) {
    this.CardRepository = CardRepository;
    // TODO: Activity Repository 추가
  }

  async fetchAllCards() {
    const cards = await this.CardRepository.findAllCards();
    return cards;
  }

  async fetchOneCard(id) {
    const card = await this.CardRepository.findCardById(id);
    return card;
  }

  async getLatestId() {
    const latestId = await this.CardRepository.findLatestId();
    return latestId;
  }

  async createCard(cardDTO) {
    // TODO: 사용자가 card를 생성했을 때 필요한 logic 추가
    await this.CardRepository.createCard(cardDTO);
  }

  async updateCard(id, cardDTO) {
    // TODO: 사용자가 card를 수정했을 때 필요한 logic 추가
    try {
      await this.CardRepository.updateCardById(id, cardDTO);
    } catch (err) {
      throw err;
    }
  }

  async removeCard(id) {
    // TODO: 사용자가 card를 삭제했을 때 필요한 logic 추가
    try {
      await this.CardRepository.removeCardById(id);
    } catch (err) {
      throw err;
    }
  }

  async moveCard(id) {
    // TODO: 사용자가 card를 이동했을 때 필요한 logic 추가
  }
}

module.exports = CardService;
