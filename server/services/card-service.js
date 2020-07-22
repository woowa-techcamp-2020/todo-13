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

  async updateCardContent(id, cardDTO) {
    // TODO: 사용자가 card를 수정했을 때 필요한 logic 추가
    await this.CardRepository.updateCardContentById(id, cardDTO);
  }

  async removeCard(id) {
    // TODO: 사용자가 card를 삭제했을 때 필요한 logic 추가
    try {
      await this.CardRepository.removeCardById(id);
    } catch (err) {
      throw err;
    }
  }

  async moveCard(id, data) {
    // TODO: 사용자가 card를 이동했을 때 필요한 logic 추가
    if (data.prevColumn === data.nextColumn) {
      await this.CardRepository.updateCardOrderInSameColumn(id, data);
    } else {
      await this.CardRepository.updateCardOrderInOtherColumn(id, data);
    }
    //뭐하지?
    // TODO
    // UPDATE query 1.
    //   이동한 카드의 카테고리(column_id) 수정
    //       id of prevCol => id of nextCol
    //   이동한 카드의 order 수정
    //       orderInPrev => orderInNext
    // Update query 2.
    // 이동한 카드가 있던 column에 속한 모든 카드들 order 수정
    //     column_id가 [id of prevCol]과 같은 카드들에 대해
    //     order가 orderInPrev 보다 큰 애 (greater than)
    // Update query 3.
    // 카드가 새로 들어 간 column에 속한 모든 카드들 order 수정
    //     column_id가 [id of nextCol]과 같은 카드들에 대해
    //     order가 orderInNext 이상인 애 (equal or greater than)
  }
}

module.exports = CardService;
