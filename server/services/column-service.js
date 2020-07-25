class ColumnService {
  constructor(ColumnRepository, ActivityRepository) {
    this.ColumnRepository = ColumnRepository;
    this.ActivityRepository = ActivityRepository;
  }

  async fetchAllColumns() {
    const columns = await this.ColumnRepository.findAllColumns();
    return columns;
  }

  async editColumnName(id, username, columnDTO) {
    const targetColumn = await this.ColumnRepository.findColumnById(id);
    await this.ColumnRepository.updateColumnById(id, columnDTO);

    const activityContent = `edited column name from ${targetColumn.column_name} to ${columnDTO.column_name}`;
    await this.ActivityRepository.createActivity(username, activityContent);
  }
}

module.exports = ColumnService;
