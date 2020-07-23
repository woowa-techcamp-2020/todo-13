class ColumnService {
  constructor(ColumnRepository, ActivityRepository) {
    this.ColumnRepository = ColumnRepository;
    this.ActivityRepository = ActivityRepository;
  }

  async fetchAllColumns() {
    const columns = await this.ColumnRepository.findAllColumns();
    return columns;
  }

  async editColumnName(id, columnDTO) {
    const oldColumnName = this.ColumnRepository.findColumnById(id);
    await this.ColumnRepository.updateColumnById(id, columnDTO);

    // TODO content string 만들고 user 정보 가져오기
    const activityContent = `edited column name from ${oldColumnName} to ${columnDTO.column_name}`;
    await this.ActivityRepository.createActivity("", activityContent);
  }
}

module.exports = ColumnService;
