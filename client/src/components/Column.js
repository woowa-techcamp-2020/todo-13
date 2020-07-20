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
  toggleIsAddCardFormVisible,
} from "../store";
import AddCardForm from "./AddCardForm";

// TODO: Add drag and drop feature

export default function Column(props, index) {
  const componentName = `column-${index}`;
  let len;

  function onEditClick(e) {
    setModal({
      title: props.category,
      label: MESSAGE.COLUMN_NAME,
      content: props.category,
    });
    toggleModal();
  }

  function onAddCardBtnClick(e) {
    toggleIsAddCardFormVisible(index);
  }

  function render() {
    const cards = getCards().filter(card => card.category === props.category);
    len = cards.length;
    const isAddCardFormVisible = getIsAddCardFormVisible(index);

    const html = `
      <div class="column-header">
        <div class="column-card-length">${len}</div>
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
        ${cards.map((card, index) => {
          return Card({ card }, index);
        }).join('')}
      </div>
    `;

    const $column = document.querySelector(`#${componentName}`);
    $column.innerHTML = html;

    bindEvent(`div#${componentName} button.column-edit`, "click", onEditClick);
    bindEvent(`div#${componentName} button.column-add-card`, "click", onAddCardBtnClick);
  }

  subscribe(componentName, 'cards', render);
  subscribe(componentName, "isAddCardFormVisible", render);

  setTimeout(render, 0);

  return `<div class="column" id=${componentName}></div>`;
}
