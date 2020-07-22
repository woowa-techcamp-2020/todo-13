class Card {
  constructor({
    id,
    author,
    last_updated,
    content,
    category,
    order_in_column,
  }) {
    this.id = id;
    this.author = author;
    this.last_updated = last_updated;
    this.content = content;
    this.category = category;
    this.order_in_column = order_in_column;
  }
}

module.exports = Card;