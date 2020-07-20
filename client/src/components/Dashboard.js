import "./Dashboard.scss";
import Column from "./Column";
import Popup from "./Popup";
import { makeElementWithClass } from "../utils/util";
import * as Data from '../Data';

export default class Dashboard {
  constructor($target, props) {
    this.$target = $target;
    this.titles = ["해야할 일", "하는 중", "다 했어"];
  }

  render() {
    return `
    <section class="dashboard">
      ${this.titles.map(title => {
        const $column = new Column(null, { title });
        return $column.render();
      }).join('')}
    </section>
    `;
  }
}
