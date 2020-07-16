import "./Header.scss";
import { makeElementWithClass } from "../utils/util";

export default class Header {
  constructor($target, props) {
    this.$target = $target;
    this.render();
  }

  render() {
    const header = makeElementWithClass({
      elementType: "header",
      className: "header",
      content: "📝 TODO",
    });
    const title = makeElementWithClass({
      elementType: "div",
      className: "title",
    });
    const menu = makeElementWithClass({
      elementType: "div",
      className: "menu",
      content: "menu",
    });

    menu.addEventListener("click", () => {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("out");
      sidebar.classList.add("active");
    });
    header.appendChild(title);
    header.appendChild(menu);

    this.$target.appendChild(header);
  }
}
