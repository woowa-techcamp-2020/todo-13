class CardService {
  constructor(CardRepository, ActivityRepository) {
    this.CardRepository = CardRepository;
    this.ActivityRepository = ActivityRepository;
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
    await this.CardRepository.createCard(cardDTO);
    const activityContent = `added ${cardDTO.content} to ${cardDTO.category}`;
    await this.ActivityRepository.createActivity(
      cardDTO.author,
      activityContent
    );
  }

  async updateCardContent(id, cardDTO) {
    await this.CardRepository.updateCardContentById(id, cardDTO);
    const activityContent = `updated ${cardDTO.content}`;
    await this.ActivityRepository.createActivity(
      cardDTO.author,
      activityContent
    );
  }

  async removeCard(id) {
    const targetCard = await this.CardRepository.findCardById(id);
    await this.CardRepository.removeCardById(id);

    const activityContent = `removed ${targetCard.content}`;
    await this.ActivityRepository.createActivity(
      targetCard.author,
      activityContent
    );
  }

  async moveCard(id, data) {
    const {
      prevColumn,
      nextColumn,
      orderInNextColumn,
      orderInPrevColumn,
    } = data;
    const targetCard = await this.CardRepository.findCardById(id);
    let activityContent = "";
    if (prevColumn === nextColumn) {
      await this.CardRepository.updateCardOrderInSameColumn(id, data);
      // TODO : activity 추가
      const from =
        orderInPrevColumn > orderInNextColumn
          ? orderInNextColumn
          : orderInPrevColumn;
      const to =
        from === orderInPrevColumn ? orderInNextColumn : orderInPrevColumn;
      activityContent = `moved ${targetCard.content} from ${from}번째 to ${to}번째  at ${prevColumn}`;
    } else {
      await this.CardRepository.updateCardOrderInOtherColumn(id, data);
      activityContent = `moved ${targetCard.content} from ${prevColumn} to ${nextColumn}`;
    }

    // Activity Repository 이용해서 이동 로그 쌓기
    await this.ActivityRepository.createActivity(
      targetCard.author,
      activityContent
    );
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
