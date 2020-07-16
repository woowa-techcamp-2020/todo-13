import "./Dashboard.scss";
import Column from "./Column";
import Popup from "./Popup";
import { makeElementWithClass } from "../utils/util";
import * as Data from '../Data';

export default class Dashboard {
  constructor($target, props) {
    this.$target = $target;
    console.log(Data.fetchCards());
    console.log(Data.fetchActivities());
    this.render();
  }

  paintColumn(dashboard) {
    const titles = ["해야 할 일", "하는중", "다 했어"];

    titles.forEach((title) => new Column(dashboard, { title }));
  }

  render() {
    const dashboard = makeElementWithClass({
      elementType: "section",
      className: "dashboard",
    });

    this.$target.appendChild(dashboard);
    this.paintColumn(dashboard);
  }
}
