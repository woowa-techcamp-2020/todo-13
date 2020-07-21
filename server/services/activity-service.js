class ActivityService {
  constructor(ActivityRepository) {
    this.ActivityRepository = ActivityRepository;
  }

  async fetchAllActivities() {
    const activities = await this.ActivityRepository.findAllActivities();
    return activities;
  }

  async createActivity(activityDTO) {
    try {
      await this.ActivityRepository.createActivity(activityDTO);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ActivityService;
