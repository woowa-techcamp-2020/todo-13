import "./Sidebar.scss";
import Item from "./Item";
import {
  getItems,
  subscribe,
  getIsSidebarVisible,
  toggleSidebar
} from "../store"
import {
  bindEvent
} from "../utils/util";

export default function Sidebar() {
  const componentName = "sidebar";

  function render() {
    const isSidebarVisible = getIsSidebarVisible();
    const items = getItems();

    function onCloseClick(e) {
      toggleSidebar();
    }

    const html = `
    <div class="sidebar ${isSidebarVisible? "active": "inactive"}">
      <div class="sidebar-header">
        <div class="sidebar-header-title">Menu</div>
        <div class="sidebar-header-close">
          <ion-icon name='close-outline'></ion-icon>
        </div>
      </div>
      <div class="sidebar-contents">
        ${items.map((item, index) => {
            return Item({ item }, index);
          }).join('')}
      </div>
    </div>
    `;

    const $sidebar = document.querySelector('.sidebar-wrapper');
    $sidebar.innerHTML = html;

    bindEvent(".sidebar-header-close", 'click', onCloseClick);
  }

  subscribe(componentName, 'items', render);
  subscribe(componentName, 'isSidebarVisible', render);

  setTimeout(render, 0);

  return `<div class="sidebar-wrapper"></div>`
}