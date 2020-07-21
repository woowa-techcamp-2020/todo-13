class ActivityService {
  constructor(ActivityRepository) {
    this.ActivityRepository = ActivityRepository;
  }

  async fetchAllActivites() {
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
