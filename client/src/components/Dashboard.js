import "./Dashboard.scss";
import Column from "./Column";
import { makeElementWithClass } from "../utils/util";

export default class Dashboard {
  constructor($target) {
    this.$target = $target;

    this.render();
  }

  paintColumn(dashboard) {
    const titles = ["해야 할 일", "하는중", "다 했어"];

    titles.forEach((title) => new Column(dashboard, { title }));
  }

  render() {
    const dashboard = makeElementWithClass("section", "dashboard");

    this.$target.appendChild(dashboard);
    this.paintColumn(dashboard);
  }
}
