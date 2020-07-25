const CardRepository = require("../repository/CardRepository");
const Card = require("../domain/Card");
require("dotenv").config();

describe("CardRepository", () => {
  const db = require("../db");
  const cardRepositoryInstance = new CardRepository(Card, db);

  //given
  describe("findAllCards", () => {
    //when
    describe("db에 카드 record가 있을 때", () => {
      //then
      it("모든 카드 record를 읽어온다", async () => {
        const fetchedCards = await cardRepositoryInstance.findAllCards();
        db.end();
        expect(fetchedCards[0]).toBeInstanceOf(Card);
      });
    });
  });
});
