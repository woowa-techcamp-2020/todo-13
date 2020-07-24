import "./Card.scss";
import { subscribe } from "../store";

// TODO: Add drag and drop feature

export default function Card(props) {
  const componentName = `card-${props.card.id}`;

  function render() {
    const html = `
      <div class="card-icon">
        <ion-icon name='receipt-outline'></ion-icon>
      </div>
      <div class="card-content">
        <div class="card-text">${props.card.content}</div>
        <div class="card-author">${props.card.author}</div>
      </div>
      <button class="card-delete">
        <ion-icon name='close-outline'></ion-icon>
      </button>
    `;

    const $card = document.querySelector(`#${componentName}`);
    $card.innerHTML = html;
  }

  setTimeout(render, 0);

  return `<div class="card" id=${componentName}></div>`;
}
