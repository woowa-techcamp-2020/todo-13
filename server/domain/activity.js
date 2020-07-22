class Activity {
    constructor({
        id,
        username,
        content,
        created_at
    }) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.created_at = created_at;
    }
}

module.exports = Activity;