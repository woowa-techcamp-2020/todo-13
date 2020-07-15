import "./Dashboard.scss";
import Column from "./Column";

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
    const dashboard = document.createElement("section");
    dashboard.classList.add("dashboard");

    this.$target.appendChild(dashboard);
    this.paintColumn(dashboard);
  }
}
