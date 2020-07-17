import "./Sidebar.scss";
import { makeElementWithClass } from "../utils/util";
import Item from "./Item";
import * as Data from "../Data";

export default class Sidebar {
  constructor($target, props) {
    this.$target = $target;

    this.render();
  }

  getItems() {
    return Data.fetchActivities();
  }

  paintItem(sidebar) {
    const items = this.getItems();
    items.forEach((item) => {
      new Item(sidebar, { item });
    });
  }

  render() {
    const sidebar = makeElementWithClass({
      elementType: "div",
      className: "sidebar",
    });
    const sidebarHeader = makeElementWithClass({
      elementType: "div",
      className: "sidebar-header",
    });
    const title = makeElementWithClass({
      elementType: "div",
      className: "sidebar-header-title",
      content: "Menu",
    });
    const close = makeElementWithClass({
      elementType: "div",
      className: "sidebar-header-close",
      content: "<ion-icon name='close-outline'></ion-icon>",
    });
    const sidebarContents = makeElementWithClass({
      elementType: "div",
      className: "sidebar-contents",
    });

    close.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebar.classList.add("out");
    });

    sidebarHeader.appendChild(title);
    sidebarHeader.appendChild(close);

    sidebar.appendChild(sidebarHeader);
    sidebar.appendChild(sidebarContents);

    this.$target.appendChild(sidebar);
    this.paintItem(sidebar);
  }
}
