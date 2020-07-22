import "./Card.scss";
import "./CopyCard.scss";

export default function CopyCard(props) {
  const componentName = `card-copy`;

  function render() {
    const html = `
        <div class="card">
            <div class="card-icon">
            <ion-icon name='receipt-outline'></ion-icon>
            </div>
            <div class="card-content">
            <div class="card-text"></div>
            <div class="card-author"></div>
            </div>
            <div class="card-delete">
            <ion-icon name='close-outline'></ion-icon>
            </div>
        </div>
      `;

    const $card = document.querySelector(`.${componentName}`);
    $card.innerHTML = html;
  }

  setTimeout(render, 0);

  return `<div class="${componentName}"></div>`;
}
