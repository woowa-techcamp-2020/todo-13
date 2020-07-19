import "./Header.scss";
import {
  bindEvent
} from "../utils/util"
import { subscribe, fetchItems } from "../store";

export default function Header(props) {
  const className = "header";

  function onMenuClick(e) {
    fetchItems();
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
