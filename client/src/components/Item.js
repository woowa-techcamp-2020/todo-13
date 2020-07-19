import "./Item.scss";
import ThumbnailImg from "../cat.jpg";

export default function Item(props) {
  const state = {
    data: props.item
  };

  // TODO: implement render function
  function render() {

  }

  setTimeout(render, 0);

  return `
    <div class="item" data-testid"item">
      <img src=${ThumbnailImg} class="item-thumbnail"/>
      <div class="item-wrapper">
        <p class="item-text">
          ${state.data.username} ${state.data.action}
        </p>
        <p class="item-timestamp">
          ${state.data.last_updated}
        </p>
      </div>
    </div>  
    `
}