class ColumnRepository {
  constructor(columnDTO, db) {
    this.columnDTO = columnDTO;
    this.db = db;
  }

  async findAllColumns() {
    // TODO: SELECT every record in Columns table
    const conn = await this.db.getConnection();
    try {
      const query = "SELECT * FROM Columns";
      const [rows] = await conn.query(query);
      const columns = rows.map((row) => {
        return new this.columnDTO({ row });
      });
    } catch (error) {
      console.error(error);
    } finally {
      conn.release();
    }
  }

  async findColumnById(id) {
    const conn = await this.db.getConnection();
    try {
      const query = "SELECT * FROM Columns WHERE=?";
      const [rows] = await conn.query(query, [id]);
      const row = rows[0];
      const column = new this.columnDTO({ row });

      return column;
    } catch (error) {
      console.error(error);
    } finally {
      conn.release();
    }
  }

  async updateColumnById(id, columnDTO) {
    // TODO: UPDATE column_name of a record
    const conn = await this.db.getConnection();
    try {
      const query = "UPDATE Columns SET column_name=? WHERE=?";
      await conn.query(query, [columnDTO.column_name, id]);
    } catch (error) {
      console.error(error);
    } finally {
      conn.release();
    }
  }
}

module.exports = ColumnRepository;
