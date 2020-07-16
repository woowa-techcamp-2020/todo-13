import "./Card.scss";
import { makeElementWithClass, showModal } from "../utils/util";

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
    });
    const cardHeader = makeElementWithClass({
      elementType: "div",
      className: "card-header",
    });
    const cardTitle = makeElementWithClass({
      elementType: "div",
      className: "card-title",
      content: this.category,
    });
    const cardContents = makeElementWithClass({
      elementType: "div",
      className: "card-contents",
    });
    const content = makeElementWithClass({
      elementType: "div",
      className: "card-content",
      content: this.content,
    });

    cardHeader.appendChild(cardTitle);
    cardContents.appendChild(content);
    card.appendChild(cardHeader);
    card.appendChild(cardContents);

    card.classList.add("draggable");
    card.setAttribute("draggable", true);

    card.addEventListener("dblclick", () =>
      showModal("Note", "Note", this.content)
    );

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
