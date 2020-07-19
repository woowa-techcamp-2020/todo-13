import "./Dashboard.scss";
import Column from "./Column";
import Popup from "./Popup";
import { subscribe, fetchCards } from "../store";

export default function Dashboard() {
  const componentName = 'dashboard';
  const categories =  ["해야할 일", "하는 중", "다 했어"];

  function render() {
    fetchCards();
    const html = `
      ${categories.map((category, index) => {
        return Column({ category }, index);
      }).join('')}
    `;

    const $dashboard = document.querySelector(`.${componentName}`);
    $dashboard.innerHTML = html;
  }

  // subscribe();
  setTimeout(render, 0);

  return `<section class=${componentName}></section>`;
}

// export default class Dashboard {
//   constructor($target, props) {
//     this.$target = $target;
//     // console.log(Data.fetchCards());
//     // console.log(Data.fetchActivities());
//     this.render();
//   }

//   paintColumn(dashboard) {
//     const titles = ["해야 할 일", "하는중", "다 했어"];

//     titles.forEach((title) => new Column(dashboard, { title }));
//   }

//   render() {
//     const dashboard = makeElementWithClass({
//       elementType: "section",
//       className: "dashboard",
//     });

//     this.$target.appendChild(dashboard);
//     this.paintColumn(dashboard);
//   }
// }
