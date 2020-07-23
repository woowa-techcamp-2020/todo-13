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
        return new this.columnDTO( row );
      });

      return columns;
    } catch (error) {
      console.error(error);
    } finally {
      conn.release();
    }
  }

  async findColumnById(id) {
    const conn = await this.db.getConnection();
    try {
      const query = "SELECT * FROM Columns WHERE id=?";
      const [rows] = await conn.query(query, [id]);
      const column = new this.columnDTO(rows[0]);

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
      const query = "UPDATE Columns SET column_name=? WHERE id=?";
      await conn.query(query, [columnDTO.column_name, id]);
    } catch (error) {
      console.error(error);
    } finally {
      conn.release();
    }
  }
}

module.exports = ColumnRepository;
