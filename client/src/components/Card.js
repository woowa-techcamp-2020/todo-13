import "./Card.scss";
import { makeElementWithClass, showModal, showPopup } from "../utils/util";
import MESSAGE from "../utils/messages";

export default class Card {
  constructor($target, props) {
    this.$target = $target;
    this.content = props.content;
    this.category = props.category;
    this.author = "작성자";

    this.render();
  }

  render() {
    const card = makeElementWithClass({
      elementType: "div",
      className: "card",
    });
    const cardIcon = makeElementWithClass({
      elementType: "div",
      className: "card-icon",
      content: "<ion-icon name='receipt-outline'></ion-icon>",
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
    const author = makeElementWithClass({
      elementType: "div",
      className: "card-author",
      content: `Added by ${this.author}`,
    });
    const cardDelete = makeElementWithClass({
      elementType: "div",
      className: "card-delete",
      content: "<ion-icon name='close-outline'></ion-icon>",
    });

    cardContents.appendChild(content);
    cardContents.appendChild(author);
    card.appendChild(cardIcon);
    card.appendChild(cardContents);
    card.appendChild(cardDelete);

    card.classList.add("draggable");
    card.setAttribute("draggable", true);

    card.addEventListener("dblclick", (e) => {
      if (e.target !== cardDelete) {
        showModal("Note", "Note", this.content);
      }
    });

    cardDelete.addEventListener("click", () => showPopup(MESSAGE.DELETE));

    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", (e) => {
      card.classList.remove("dragging");
      // TODO: className에 맞게 내용 바꿔주기
      console.log(e.target.parentNode.childNodes[0]);
    });

    this.$target.appendChild(card);
  }
}
