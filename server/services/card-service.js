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
      username,
      prevColumn,
      nextColumn,
      orderInNextColumn,
      orderInPrevColumn,
    } = data;
    const targetCard = await this.CardRepository.findCardById(id);
    let activityContent = "";
    if (prevColumn === nextColumn) {
      await this.CardRepository.updateCardOrderInSameColumn(id, data);
      const from =
        orderInPrevColumn > orderInNextColumn
          ? orderInNextColumn
          : orderInPrevColumn;
      const to =
        (from === orderInPrevColumn) ? orderInNextColumn : orderInPrevColumn;
      activityContent = `moved ${targetCard.content} from ${from}번째 to ${to}번째  at ${prevColumn}`;
    } else {
      await this.CardRepository.updateCardOrderInOtherColumn(id, data);
      activityContent = `moved ${targetCard.content} from ${prevColumn} to ${nextColumn}`;
    }

    await this.ActivityRepository.createActivity(
      username,
      activityContent
    );
  }
}

module.exports = CardService;
