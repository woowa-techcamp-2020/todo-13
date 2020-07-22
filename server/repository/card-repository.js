class CardRepository {
  constructor(cardDTO, db) {
    this.cardDTO = cardDTO;
    this.db = db;
  }

  async findAllCards() {
    // TODO edit query
    const conn = await this.db.getConnection();
    try {
      const [rows] = await conn.query(
        "SELECT Cards.id, Users.username AS author,\
         Cards.last_updated, Cards.content, column_name AS category,\
         Cards.order_in_column\
        FROM Cards \
        JOIN Users ON Cards.user_id = Users.id\
        JOIN Columns ON Cards.column_id = Columns.id\
        ORDER BY 6 DESC");
        
      const cards = rows.map((row) => {
        return new this.cardDTO(row)
      });
      return cards;
    } catch (error) {
      console.error(error);
    } finally {
      await conn.release();
    }
  }

  async findCardById(id) {
    const conn = await this.db.getConnection();
    try {
      const query = "SELECT Cards.id, Users.username AS author,\
      Cards.last_updated, Cards.content, column_name AS category,\
      Cards.order_in_column\
      FROM Cards \
      JOIN Users ON Cards.user_id = Users.id\
      JOIN Columns ON Cards.column_id = Columns.id WHERE Cards.id=? ";

      const [rows] = await conn.query(query, [id]);
      const card = new this.cardDTO(rows[0]);

      return card;
    } catch (error) {
      console.error(error);
    } finally {
      await conn.release();
    }
  }

  async findLatestId() {
    const conn = await this.db.getConnection();
    try {
      const [rows] = await conn.query("SELECT id FROM Cards ORDER BY id DESC LIMIT 1");
      return rows[0].id;
    } catch (error) {
      console.error(error);
    } finally {
      await conn.release();
    }
  }

  // TODO: use transaction
  async createCard(cardDTO) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      // userid 가져오기
      const getUserIdQuery = "SELECT id FROM Users WHERE username=?";
      let [rows] = await conn.query(getUserIdQuery, [cardDTO.author]);
      const userId = rows[0].id;

      // column_id 가져오기
      const getColumnIdQuery = "SELECT id FROM Columns WHERE column_name=?";
      [rows] = await conn.query(getColumnIdQuery, [cardDTO.category]);
      const columnId = rows[0].id;

      // column의 마지막 order 가져오기
      const getLastOrderQeury = "SELECT order_in_column FROM Cards WHERE column_id=? ORDER BY order_in_column DESC LIMIT 1";
      [rows] = await conn.query(getLastOrderQeury, [columnId]);
      const lastOrderNumber = rows[0].order_in_column;

      // 새로 card insert
      const insertCardQuery = "INSERT INTO todo.Cards (user_id, content, column_id, order_in_column)\
      VALUES (?, ?, ?, ?);"
      await conn.query(insertCardQuery, [userId, cardDTO.content ,columnId, lastOrderNumber+1]);

      await conn.commit();
    } catch (error) {
      console.error(error);
      conn.rollback();
    } finally {
      conn.release();
    }
  }

  async updateCardContentById(id, cardDTO) {
    const conn = await this.db.getConnection();
    try {
      const query = "UPDATE Cards SET content= ? WHERE id=?";
      await conn.query(query, [cardDTO.content, id]);
    } catch (err) {
      console.error(err)
    } finally {
      conn.release();
    }
  }

  async removeCardById(id) {
    const conn = await this.db.getConnection();
    try {
      const query = "DELETE FROM Cards WHERE id=?";
      await conn.query(query, [id]);
    } catch (err) {
      console.error(err);
    } finally {
      conn.release();
    }
  }

  async updateCardOrderInSameColumn(id, data) {

  }

  async updateCardOrderInOtherColumn(id, data) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      // prevColumnId 가져오기
      const getPrevColumnQuery = "SELECT id FROM Columns WHERE column_name=?";
      let [rows] = await conn.query(getPrevColumnQuery, [data.prevColumn]);
      const prevColumnId = rows[0].id;

      // nextColumnId 가져오기
      const getNextColumnQuery = "SELECT id FROM Columns WHERE column_name=?";
      [rows] = await conn.query(getNextColumnQuery, [data.nextColumn]);
      const nextColumnId = rows[0].id;
      console.log(prevColumnId, nextColumnId);
      
      // 들어갈 자리 비워주기
      const incrementOrderQuery = "UPDATE Cards SET order_in_column = (order_in_column + 1)\
      where column_id =? and order_in_column >= ?";
      await conn.query(incrementOrderQuery, [nextColumnId, data.orderInNextColumn]);

      // 새로운 column의 order로 카드 정보 update
      const updateTargetCardQuery = "UPDATE Cards SET order_in_column=?,\
      column_id=? WHERE id=?";
      await conn.query(updateTargetCardQuery, [data.orderInNextColumn, nextColumnId, id]);
      
      
      const decrementOrderQuery = "UPDATE Cards SET order_in_column = (order_in_column - 1)\
      where column_id =? and order_in_column > ?";
      await conn.query(decrementOrderQuery, [prevColumnId, data.orderInPrevColumn]);

      await conn.commit();
    } catch (error) {
      console.error(error);
      conn.rollback();
    } finally {
      conn.release();
    }
  }
}

module.exports = CardRepository;
