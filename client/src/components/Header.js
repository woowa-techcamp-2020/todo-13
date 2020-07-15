import "./Header.scss";
import { makeElementWithClass } from "../utils/util";

export default class Header {
  constructor($target, props) {
    this.$target = $target;
    this.render();
  }

  render() {
    const header = makeElementWithClass("header", "header");
    const title = makeElementWithClass("div", "title");
    const menu = makeElementWithClass("div", "menu");
    title.innerHTML = "📝 TODO";
    menu.innerHTML = "menu";
    header.appendChild(title);
    header.appendChild(menu);

    this.$target.appendChild(header);
  }
}
