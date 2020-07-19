import "./Sidebar.scss";
import Item from "./Item";
import {
  getIsSidebarVisible,
  getItems,
  fetchItems,
  subscribe
} from "../store"

export default function Sidebar() {
  const name = "sidebar";

  function render() {
    const items = getItems();
    const className = ".sidebar-contents";

    const html = items.map(item => {
      return Item({
        item
      });
    }).join('');
    
    const $sidebarContents = document.querySelector(className);
    $sidebarContents.innerHTML = html;
  }

  subscribe(name, 'items', render);
  setTimeout(render, 0);

  return `
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-header-title">Menu</div>
      <div class="sidebar-header-close">
        <ion-icon name='close-outline'></ion-icon>
      </div>
    </div>
    <div class="sidebar-contents">
    </div>
  </div>
  `
}
