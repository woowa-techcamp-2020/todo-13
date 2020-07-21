import "./Dashboard.scss";
import Column from "./Column";
import {
  fetchCards,
  getCategories,
  subscribe,
  setModal,
  toggleIsAddCardFormVisible,
  toggleModal,
  deleteCard,
} from "../store";
import { bindEvent } from "../utils/util";
import MESSAGE from "../utils/messages";

export default function Dashboard() {
  const componentName = "dashboard";

  function onColumnAddCardClick(e) {
    const addCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="add-circle-outline"]'
      ),
    ];
    const removeCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="remove-circle-outline"]'
      ),
    ];
    const cardCtrlBtns = addCardBtns.concat(removeCardBtns);

    if (cardCtrlBtns.includes(e.target)) {
      const $column = e.target.closest(".column");
      const index = $column.id.split("-")[1];

      toggleIsAddCardFormVisible(index);
    }
  }

  function onColumnTitleEditClick(e) {
    const editCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="pencil-outline"]'
      ),
    ];
    if (editCardBtns.includes(e.target)) {
      const $columnHeader = e.target.closest(".column-header");
      const title = $columnHeader.childNodes[3].innerText;

      setModal({
        title,
        label: MESSAGE.COLUMN_NAME,
        content: title,
      });
      toggleModal();
    }
  }

  function onBtnMouseEnter(e) {
    const addCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="add-circle-outline"]'
      ),
    ];
    const closeBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="close-outline"]'
      ),
    ];
    if (addCardBtns.includes(e.target) || closeBtns.includes(e.target)) {
      e.target.style.background = "lightgray";
    }
  }

  function onBtnMouseOut(e) {
    const addCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="add-circle-outline"]'
      ),
    ];
    const closeBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="close-outline"]'
      ),
    ];
    if (addCardBtns.includes(e.target) || closeBtns.includes(e.target)) {
      e.target.style.background = "white";
    }
  }

  function render() {
    const categories = getCategories();
    const html = `
      ${categories
        .map((category, index) => {
          return Column({ category }, index);
        })
        .join("")}
    `;

    const $dashboard = document.querySelector(`.${componentName}`);
    $dashboard.innerHTML = html;

    bindEvent(`section.${componentName}`, "click", onColumnTitleEditClick);
    bindEvent(`section.${componentName}`, "click", onColumnAddCardClick);
    bindEvent(`section.${componentName}`, "mouseenter", onBtnMouseEnter, true);
    bindEvent(`section.${componentName}`, "mouseout", onBtnMouseOut, true);
  }

  fetchCards();

  subscribe(componentName, "categories", render);

  setTimeout(render, 0);

  return `<section class=${componentName}></section>`;
}
