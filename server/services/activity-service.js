class ActivityService {
  constructor(ActivityRepository) {
    this.ActivityRepository = ActivityRepository;
  }

  async fetchAllActivities() {
    const activities = await this.ActivityRepository.findAllActivities();
    return activities;
  }
}

module.exports = ActivityService;
