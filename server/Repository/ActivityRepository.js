class ActivityRepository {
  constructor(activityDTO, db) {
    this.activityDTO = activityDTO;
    this.db = db;
  }

  async findAllActivities() {
    const [rows] = await this.db.query("SELECT * FROM todo.Activities");
    const activities = rows.map((row) => {
      return new this.activityDTO({
        id: row.id,
        userid: row.userid,
        content: row.content,
        created_at: row.created_at,
      });
    });
    return activities;
  }

  async findActivityById(id) {
    const query = "SELECT * FROM todo.Activities WHERE id=?";
    const [rows] = await this.db.query(query, [id]);
    const row = rows[0];

    const activity = new this.activityDTO({
      id: row.id,
      userid: row.userid,
      content: row.content,
      created_at: row.created_at,
    });

    return activity;
  }

  async createActivity(activityDTO) {
    const query =
      "INSERT INTO todo.Activities\
        (userid, content, created_at)\
        VALUES (?, ?, ?)";
    const values = Object.values(activityDTO);
    values.shift();

    try {
      await this.db.query(query.values);
    } catch (err) {
      throw err;
    }
  }
}
