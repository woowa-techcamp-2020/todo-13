import "./Card.scss";
import { makeElementWithClass, showModal, showPopup } from "../utils/util";
import MESSAGE from "../utils/messages";

export default class Card {
  constructor($target, props) {
    this.$target = $target;
    this.content = props.content;
    this.idx = props.index;
    this.category = props.category;
    this.author = "작성자";
  }

  render() {
    return `
    <div class="card" id="card-${this.content.id}">
      <div class="card-icon">
        <ion-icon name='receipt-outline'></ion-icon>
      </div>
      <div class="card-container">
        <div class="card-text">${this.content.content}</div>
        <div class="card-author">${this.content.author}</div>
      </div>
      <div class="card-delete">
        <ion-icon name='close-outline'></ion-icon>
      </div>
    </div>
  `;
  }
}
