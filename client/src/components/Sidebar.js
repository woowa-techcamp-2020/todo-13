import "./Sidebar.scss";
import Item from "./Item";
import * as Data from "../Data";
import {
  getIsSidebarVisible
} from "../store"

export default function Sidebar() {
  const state = {
    items: []
  };

  function getItems() {
    state.items = Data.fetchActivities();
  }

  function render() {
    // const isVisible = getIsSidebarVisible();
    // const className = ".sidebar-contents";
    // this.getItems();

    // const html = this.state.map(item => {
    //   return Item({
    //     item
    //   });
    // }).join('');

    // const $sidebarContents = document.querySelector(className);
    // $sidebarContents.innerHTML = html;
  }

  getItems();
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
      ${state.items.map(item => {
        return Item({item});
      })}
    </div>
  </div>
  `
}