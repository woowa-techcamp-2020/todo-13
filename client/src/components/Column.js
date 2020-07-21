import "./Column.scss";
import Card from "./Card";
import {
  bindEvent
} from "../utils/util";
import MESSAGE from "../utils/messages";
import {
  getCards,
  subscribe,
  setModal,
  toggleModal,
  getIsAddCardFormVisible,
  setPopupMessage,
  togglePopup,
  setTargetCardId,
} from "../store";
import AddCardForm from "./AddCardForm";

// TODO: Add drag and drop feature

export default function Column(props, index) {
  const componentName = `column-${index}`;

  function onCardCloseBtnClick(e) {
    const cardCloseBtns = [...document.querySelectorAll(`div.card ion-icon.md.hydrated[name=\"close-outline\"]`)];
    if (cardCloseBtns.includes(e.target)) {
      const cardId = e.target.closest(".card").id.split('-')[1];
      setTargetCardId(parseInt(cardId));
      setPopupMessage(MESSAGE.DELETE);
      togglePopup();
    }
  }

  function onAddCardDoubleClick(e) {
    const $cardDelete = document.querySelector(`div#${componentName} .card-delete`);
    const $column = document.querySelector(`div#${componentName}`);
    const $columnHeader = document.querySelector(`div#${componentName} .column-header`);

    if (e.target !== $cardDelete && e.target !== $column && e.target !== $columnHeader) {
      const $card = e.target.closest(".card");
      const cardContent = $card.childNodes[3].firstElementChild.innerHTML;
      const cardId = $card.id.split('-')[1];
      setTargetCardId(cardId);
      setModal({
        title: "note",
        label: "Note",
        content: cardContent,
      });
      toggleModal();
    }
  }

  function render() {
    const cards = getCards().filter(card => card.category === props.category);
    const isAddCardFormVisible = getIsAddCardFormVisible(index);

    const html = `
      <div class="column-header">
        <div class="column-card-length">${cards.length}</div>
        <div class="column-title">${props.category}</div>
        <div class="column-header-btns">
          <button class="column-edit">
            <ion-icon name='pencil-outline'></ion-icon>
          </button>
          <button class="column-add-card">
            ${isAddCardFormVisible? 
              "<ion-icon name='remove-circle-outline'></ion-icon>"
              :"<ion-icon name='add-circle-outline'></ion-icon>"}
          </button>
          <button class="column-delete">
            <ion-icon name='close-outline'></ion-icon>
          </button>
        </div>
      </div>
      ${AddCardForm(index)}
      <div class="column-contents">
        ${cards.map((card) => {
          return Card({ card });
        }).join('')}
      </div>
    `;

    const $column = document.querySelector(`#${componentName}`);
    $column.innerHTML = html;

    bindEvent(`div#${componentName}`, "dblclick", onAddCardDoubleClick);
    bindEvent(`div#${componentName}`, "click", onCardCloseBtnClick);
  }

  subscribe(componentName, 'cards', render);
  subscribe(componentName, "isAddCardFormVisible", render);

  setTimeout(render, 0);

  return `<div class="column" id=${componentName}></div>`;
}