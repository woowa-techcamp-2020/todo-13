import "./Card.scss";
import {
  bindEvent
} from "../utils/util";
import MESSAGE from "../utils/messages";
import {
  togglePopup,
  setPopupMessage,
  setModal,
  toggleModal
} from "../store";

// TODO: Add drag and drop feature 

export default function Card(props, index) {
  const componentName = `card-${props.card.id}`;

  function onCloseBtnClick(e) {
    setPopupMessage(MESSAGE.COLUMN_NAME);
    togglePopup();
  }

  function onDoubleClick(e) {
    const $cardDelete = document.querySelector(".card-delete");
    if (e.target !== $cardDelete) {
      setModal({
        title: "note",
        label: "Note",
        content: props.card.content,
      })
      toggleModal();
    }
  }

  function render() {
    const html = `
      <div class="card-icon">
        <ion-icon name='receipt-outline'></ion-icon>
      </div>
      <div class="card-content">
        <div class="card-text">${props.card.content}</div>
        <div class="card-author">${props.card.author}</div>
      </div>
      <div class="card-delete">
        <ion-icon name='close-outline'></ion-icon>
      </div>
    `;

    const $card = document.querySelector(`#${componentName}`);
    $card.innerHTML = html;

    bindEvent(`div#${componentName} div.card-delete`, "click", onCloseBtnClick);
    bindEvent(`div#${componentName}`, "dblclick", onDoubleClick);
  }

  setTimeout(render, 0);

  return `<div class="card" id=${componentName}></div>`;
}
