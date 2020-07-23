class ColumnRepository {
    constructor(columnDTO, db) {
        this.columnDTO = columnDTO;
        this.db = db;
    }

    async findAllColumns() {
        // TODO: SELECT every record in Columns table
    }

    async updateColumnById(id) {
        // TODO: UPDATE column_name of a record
    }
}

module.exports = ColumnRepository;
