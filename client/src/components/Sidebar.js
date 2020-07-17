import "./Sidebar.scss";
import {
  makeElementWithClass
} from "../utils/util";
import Item from "./Item";
import * as Data from "../Data";

export default function Sidebar() {
  const state = {
    items: []
  };

  function getItems() {
    state.items = Data.fetchActivities();
  }

  function render() {
    const className = ".sidebar-contents";
    this.getItems();

    const html = this.state.map(item => {
      return Item({
        item
      });
    }).join('');

    const $sidebarContents = document.querySelector(className);
    $sidebarContents.innerHTML = html;
  }

  getItems();

  return `
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-header-title">Menu</div>
      <div class="sidebar-header-close">
        <ion-icon name='close-outline'></ion-icon>
      </div>
    </div>
    <div class="sidebar-contents">
      ${state.items.map(item => {
        return Item({item});
      })}
    </div>
  </div>
  `
}

// export default class Sidebar {
//   constructor($target, props) {
//     this.$target = $target;
//     this.getItems();

//     // console.log(this.state.items)
//     console.log(this.rende());
//     // this.render();
//   }

//   state={
//     items:[]
//   };

//   getItems() {
//     this.state.items = Data.fetchActivities();
//   }

// paintItem(sidebar) {
//   const items = this.getItems();
//   items.forEach((item) => {
//     new Item(sidebar, { item });
//   });
// }

// render() {
//   const sidebar = makeElementWithClass({
//     elementType: "div",
//     className: "sidebar",
//   });
//   const sidebarHeader = makeElementWithClass({
//     elementType: "div",
//     className: "sidebar-header",
//   });
//   const title = makeElementWithClass({
//     elementType: "div",
//     className: "sidebar-header-title",
//     content: "Menu",
//   });
//   const close = makeElementWithClass({
//     elementType: "div",
//     className: "sidebar-header-close",
//     content: "<ion-icon name='close-outline'></ion-icon>",
//   });
//   const sidebarContents = makeElementWithClass({
//     elementType: "div",
//     className: "sidebar-contents",
//   });

//   close.addEventListener("click", () => {
//     sidebar.classList.remove("active");
//     sidebar.classList.add("out");
//   });

//   sidebarHeader.appendChild(title);
//   sidebarHeader.appendChild(close);

//   sidebar.appendChild(sidebarHeader);
//   sidebar.appendChild(sidebarContents);

//   this.$target.appendChild(sidebar);
//   this.paintItem(sidebar);
// }

//   rende() {
//     return `
//     <div class="sidebar">
//       <div class="sidebar-header">
//         <div class="sidebar-header-title"></div>
//         <div class="sidebar-header-close"></div>
//       </div>
//       <div class="sidebar-contents">
//         ${this.state.items.map(item => {
//           return new Item(document.querySelector(".sidebar-contents"), {item} );
//         })}
//       </div>
//     </div>
//     `
//   }
// }