import "./Header.scss";
import { bindEvent } from "../utils/util";
import { subscribe, fetchItems, toggleSidebar } from "../store";

export default function Header(props) {
  const componentName = "header";

  function onMenuClick(e) {
    fetchItems();
    toggleSidebar("active");
  }

  function render() {
    bindEvent(".header-menu", "click", onMenuClick);
  }

  fetchItems();
  setTimeout(render, 0);

  return `
    <header class=${componentName}>
      <div class="header-title">📝 TODO</div>
      <div class="header-menu">
        <ion-icon name="menu-outline"></ion-icon>
        <p class='header-text'>MENU</p>
      </div>
    </header>
  `;
}
