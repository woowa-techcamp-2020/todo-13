import "./Column.scss";
import Card from "./Card";
import { makeElementWithClass, showModal } from "../utils/util";
import MESSAGE from "../utils/messages";
import {fetchCards} from "../Data";

export default class Column {
  constructor($target, props) {
    this.$target = $target;
    this.title = props.title;
    this.cardLeng = 0;
    this.cardLengElement = "";
    this.cards = fetchCards().filter(card => card.category === this.title);
  }

  render() {
    return `
    <div class="column">
      <div class="column-header">
        <div class="column-card-length">${this.cardLeng}</div>
        <div class="column-title">${this.title}</div>
        <div class="column-header-btns">
          <button class="column-edit">
            <ion-icon name='pencil-outline'></ion-icon>
          </button>
          <button class="column-add-card">
            <ion-icon name='add-circle-outline'></ion-icon>
          </button>
          <button class="column-delete-button">
            <ion-icon name='close-outline'></ion-icon>
          </button>
        </div>
      </div>
      <div class="column-add-card-form">
        <textarea class="column-card-content"></textarea>
        <div class="column-cards-btn">
          <button class="column-add-btn">Add</button>
          <button class="column-cancel-btn">Cancel</button>
        </div>
      </div>
      ${this.cards.map(card => {
        const $card = new Card(null, {category: this.title, content: card});
        return $card.render();
      }).join('')}
    </div>
    `;
  }
}
