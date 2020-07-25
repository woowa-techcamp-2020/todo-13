class ActivityRepository {
  constructor(activityDTO, db) {
    this.activityDTO = activityDTO;
    this.db = db;
  }

  async findAllActivities() {
    const conn = await this.db.getConnection();
    try {
      const query =
        "SELECT Activities.id, Users.username, Activities.content, Activities.created_at\
      FROM Activities JOIN Users ON Activities.user_id = Users.id\
      ORDER BY Activities.created_at DESC";

      const [rows] = await conn.query(query);
      const activities = rows.map((row) => {
        return new this.activityDTO(row);
      });
      
      return activities;
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }

  async findActivityById(id) {
    const conn = await this.db.getConnection();
    try {
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
      
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }

  async createActivity(username, content) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      const getUserIdQuery = "SELECT id FROM Users WHERE username=?";
      let [rows] = await conn.query(getUserIdQuery, [username]);
      const userId = rows[0].id;

      const insertActivityQuery = "INSERT INTO Activities (user_id, content)\
      VALUES (?, ?)";
      await conn.query(insertActivityQuery, [userId, content]);

      await conn.commit();
    } catch (err) {;
      conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}

module.exports = ActivityRepository;
