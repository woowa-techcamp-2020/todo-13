import "./Sidebar.scss";
import Item from "./Item";
import {
  getItems,
  subscribe,
  getIsSidebarVisible,
  toggleSidebar,
} from "../store";
import { bindEvent } from "../utils/util";

export default function Sidebar() {
  const componentName = "sidebar";

  function render() {
    const isSidebarVisible = getIsSidebarVisible();
    const items = getItems();

    function onCloseClick(e) {
      toggleSidebar("inactive");
    }

    function onOutOfSidebarClick(e) {
      // TODO: sidebar가 열려있을 때, 밖의 영역을 클릭하면 닫힌다.
      const isSidebarVisible = getIsSidebarVisible() === "active";
      const hasClickedOutSide = !e.target.closest("div.sidebar");
  
      if (isSidebarVisible && hasClickedOutSide) {
        toggleSidebar("inactive");
        e.stopPropagation();
      }
    }

    const html = `
    <div class="sidebar ${isSidebarVisible}">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          🛎 Activities
        </div>
        <button class="sidebar-header-close">
          <ion-icon name='close-outline'></ion-icon>
        </button>
      </div>
      <div class="sidebar-contents">
        ${items
          .map((item, index) => {
            return Item({ item }, index);
          })
          .join("")}
      </div>
    </div>
    `;

    const $sidebar = document.querySelector(".sidebar-wrapper");
    $sidebar.innerHTML = html;

    bindEvent(".sidebar-header-close", "click", onCloseClick);
    bindEvent("#App", "click", onOutOfSidebarClick, true);
  }

  subscribe(componentName, "isSidebarVisible", render);

  setTimeout(render, 0);

  return `<div class="sidebar-wrapper"></div>`;
}
