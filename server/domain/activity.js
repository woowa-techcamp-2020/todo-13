class Activity {
    constructor({
        id,
        userid,
        content,
        created_at
    }) {
        this.id = id;
        this.userid = userid;
        this.content = content;
        this.created_at = created_at;
    }
}

module.exports = Activity;