class ActivityService {
  constructor(ActivityRepository) {
    this.ActivityRepository = ActivityRepository;
  }

  fetchAllActivities() {
    const activities = this.ActivityRepository.findAllActivities();
    return activities;
  }

  /*
  async createActivity(activityDTO) {
    try {
      await this.ActivityRepository.createActivity(activityDTO);
    } catch (error) {
      throw error;
    }
  }
  */
}

module.exports = ActivityService;
