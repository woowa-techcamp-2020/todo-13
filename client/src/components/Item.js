import "./Item.scss";
import ThumbnailImg from "../cat.jpg";

export default function Item(props, index) {
  const componenetName = `item-${index}`;

  function render() {
    const html = `
      <img src=${ThumbnailImg} class="item-thumbnail"/>
        <div class="item-wrapper">
          <p class="item-text">
            ${props.item.username} ${props.item.content}
          </p>
          <p class="item-timestamp">
            ${props.item.last_updated}
          </p>
        </div>
      `;

    const $item = document.querySelector(`#${componenetName}`);
    $item.innerHTML = html;
  }

  setTimeout(render, 0);

  return `<div class=item id=${componenetName}></div>`;
}