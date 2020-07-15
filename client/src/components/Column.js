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

    contents.forEach(
      (content) => new Card(column, { category: this.title, content })
    );
  }

  render() {
    const column = makeElementWithClass("div", "column");

    function getDragAfterElement(container, y) {
      const cards = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];
      return cards.reduce(
        (closeset, child) => {
          const boundingBox = child.getBoundingClientRect();
          const offset = y - boundingBox.top - boundingBox.height / 2;

          if (offset < 0 && offset > closeset.offset) {
            return {
              offset: offset,
              element: child,
            };
          } else {
            return closeset;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }

    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(column, e.clientY);
      const draggingElement = document.querySelector(".dragging");

      if (afterElement === null) {
        column.appendChild(draggingElement);
      } else {
        column.insertBefore(draggingElement, afterElement);
      }
    });

    const title = makeElementWithClass("div", "column_title");
    title.innerHTML = this.title;
    title.addEventListener("dblclick", () => showPopup(MSG.DELETE));
    column.appendChild(title);

    this.$target.appendChild(column);
    this.paintCard(column);
  }
}
