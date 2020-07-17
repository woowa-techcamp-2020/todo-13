import "./Item.scss";
import {
  makeElementWithClass
} from "../utils/util";
import ThumbnailImg from "../cat.jpg";

export default function Item(props) {
  const state = {
    data: props.item
  };

  function render() {

  }

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

// export default class Item {
//   constructor($target, props) {
//     this.$target = $target;

//     this.data = props.item;

    // this.$item = makeElementWithClass({
    //   elementType: "div",
    //   className: "item",
    // });
    // this.$item.setAttribute("data-testid", "item");

    // this.$target.appendChild(this.$item);

    // this.createThumbnail.bind(this);
    // this.createWrapper.bind(this);
    // this.createText.bind(this);
    // this.createTimestamp.bind(this);

    // this.createThumbnail();
    // this.createWrapper();
    // this.createText();
    // this.createTimestamp();

  //   this.render();
  // }

  // setState(data) {
  //   this.data = data;
  //   this.render();
  // }

  // createThumbnail() {
  //   const $thumbnail = makeElementWithClass({
  //     elementType: "img",
  //     className: "item-thumbnail",
  //   });
  //   this.$thumbnail = $thumbnail;
  //   this.$item.appendChild($thumbnail);
  // }

  // createWrapper() {
  //   const $wrapper = makeElementWithClass({
  //     elementType: "div",
  //     className: "item-wrapper",
  //   });
  //   this.$wrapper = $wrapper;
  //   this.$item.appendChild($wrapper);
  // }

  // createText() {
  //   const $text = makeElementWithClass({
  //     elementType: "p",
  //     className: "item-text",
  //   });
  //   this.$text = $text;
  //   this.$wrapper.appendChild($text);
  // }

  // createTimestamp() {
  //   const $timestamp = makeElementWithClass({
  //     elementType: "p",
  //     className: "item-timestamp",
  //   });
  //   this.$timestamp = $timestamp;
  //   this.$wrapper.appendChild($timestamp);
  // }

  // render() {
  //   this.$thumbnail.src = ThumbnailImg;
  //   this.$text.innerHTML = `${this.data.username}  ${this.data.action}`;
  //   this.$timestamp.innerHTML = this.data.last_updated;
  // }
//   render() {
//     return `
//     <div class="item" data-testid"item">
//       <img src=${ThumbnailImg} class="item-thumbnail"/>
//       <div class="item-wrapper">
//         <p class="item-text">
//           ${this.data.username} ${this.data.action}
//         </p>
//         <p class="item-timestamp">
//           ${this.data.last_updated}
//         </p>
//       </div>
//     </div>  
//     `;
//   }
// }