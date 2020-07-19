import "./Header.scss";
import {
  bindEvent
} from "../utils/util"
import { subscribe, fetchItems, toggleSidebar } from "../store";

export default function Header(props) {
  const componentName = "header";

  function onMenuClick(e) {
    fetchItems();
    toggleSidebar();
  }

  function render() {
    bindEvent(".header-menu", "click", onMenuClick);
  }

  setTimeout(render, 0);

  return `
    <header class=${componentName}>
      <div class="header-title">📝 TODO</div>
      <div class="header-menu">menu</div>
    </header>
  `;
}
