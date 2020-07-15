import "./Column.scss";
import Card from "./Card";
import { makeElementWithClass, showPopup } from "../utils/util";
import { MSG } from "../utils/constants";

export default class Column {
  constructor($target, props) {
    this.$target = $target;
    this.title = props.title;

    this.render();
  }

  paintCard(column) {
    const contents = ["설정파일 분리 리팩토링 작업", "데모 환경 구성"];

    contents.forEach((content) => new Card(column, { content }));
  }

  render() {
    const column = makeElementWithClass("div", "column");
    const title = makeElementWithClass("div", "column_title");
    title.innerHTML = this.title;
    title.addEventListener("dblclick", () => showPopup(MSG.DELETE));
    column.appendChild(title);

    this.$target.appendChild(column);
    this.paintCard(column);
  }
}
