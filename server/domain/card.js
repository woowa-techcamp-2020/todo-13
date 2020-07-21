class Card {
  constructor({
    id,
    author,
    last_updated,
    content,
    category
  }) {
    this.id = id;
    this.author = author;
    this.last_updated = last_updated;
    this.content = content;
    this.category = category;
  }
}

module.exports = Card;