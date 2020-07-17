class CardRepository {
  constructor(cardDTO, db) {
    this.cardDTO = cardDTO;
    this.db = db;
  }

  async findAllCards() {
    const [rows] = await this.db.query("SELECT * FROM todo.Cards");
    const cards = rows.map((row) => {
      return new this.cardDTO(
        row.id,
        row.author,
        row.last_updated,
        row.content,
        row.category
      );
    });
    return cards;
  }

  async findCardById(id) {
    const query = "SELECT * FROM todo.Cards WHERE id=? ";
    const [rows] = await this.db.query(query, [id]);
    const row = rows[0];

    const card = new this.cardDTO(
      row.id,
      row.author,
      row.last_updated,
      row.content,
      row.category
    );

    return card;
  }

  async createCard(cardDTO) {
    const query =
      "INSERT INTO todo.Cards\
    (id, author, last_updated, content, category)\
    VALUES (?, ?, ?, ?, ?)";
    const values = Object.values(cardDTO);
    try {
      await this.db.query(query, values);
    } catch (err) {
      throw err;
    }
  }

  async updateCardById(id, cardDTO) {
    const query =
      "UPDATE todo.Cards\
      SET\
        author= ?,\
        content= ?,\
        category= ?\
      WHERE id=? ;";

    const { author, content, category } = cardDTO;

    try {
      await this.db.query(query, [author, content, category, id]);
    } catch (err) {
      throw err;
    }
  }

  async removeCardById(id) {
    const query = "DELETE FROM todo.Cards WHERE id=? ";

    try {
      await this.db.query(query, [id]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CardRepository;
