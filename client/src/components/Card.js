import "./Card.scss";
import { makeElementWithClass } from "../utils/util";

export default class Card {
  constructor($target, props) {
    this.$target = $target;
    this.content = props.content;

    this.render();
  }

  render() {
    const card = makeElementWithClass("div", "card");
    card.innerHTML = this.content;

    this.$target.appendChild(card);
  }
}
