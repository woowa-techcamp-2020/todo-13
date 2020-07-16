import "./Sidebar.scss";
import { makeElementWithClass } from "../utils/util";

export default class Sidebar {
  constructor($target, props) {
    this.$target = $target;

    this.render();
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
  }
}
