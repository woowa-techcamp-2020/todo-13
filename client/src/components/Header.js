import "./Header.scss";
import {
  bindEvent
} from "../utils/util"
import { subscribe } from "../store";

export default function Header(props) {
  const className = "header";

  function onMenuClick(e) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("inactive");
    sidebar.classList.add("active");
  }

  function render() {
    bindEvent("header-menu", "click", onMenuClick);
  }

  setTimeout(render, 0);

  return `
    <header class=${className}>
      <div class="header-title">📝 TODO</div>
      <div class="header-menu">menu</div>
    </header>
  `;
}

// export default class Header {
//   constructor($target, props) {
//     this.$target = $target;
//     this.render();
//   }

//   render() {
//     const header = makeElementWithClass({
//       elementType: "header",
//       className: "header",
//       content: "📝 TODO",
//     });
//     const title = makeElementWithClass({
//       elementType: "div",
//       className: "title",
//     });
//     const menu = makeElementWithClass({
//       elementType: "div",
//       className: "menu",
//       content: "menu",
//     });

//     menu.addEventListener("click", () => {
//       const sidebar = document.querySelector(".sidebar");
//       sidebar.classList.remove("out");
//       sidebar.classList.add("active");
//     });
//     header.appendChild(title);
//     header.appendChild(menu);

//     this.$target.appendChild(header);
//   }
// }