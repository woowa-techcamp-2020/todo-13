import "./Card.scss";
import { makeElementWithClass } from "../utils/util";

export default class Card {
  constructor($target, props) {
    this.$target = $target;
    this.content = props.content;
    this.category = props.category;

    this.render();
  }

  render() {
    const card = makeElementWithClass({
      elementType: "div",
      className: "card",
      content: this.category + " | " + this.content,
    });
    card.classList.add("draggable");
    card.setAttribute("draggable", true);

    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", (e) => {
      card.classList.remove("dragging");
      card.innerHTML = `${e.target.parentNode.childNodes[0].innerHTML} | ${this.content}`;
    });

    this.$target.appendChild(card);
  }
}
