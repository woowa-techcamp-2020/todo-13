import "./AddCardForm.scss";
import {
  getCardFormText,
  getIsAddCardFormVisible,
  subscribe,
  toggleIsAddCardFormVisible,
  onCardFormTextChange,
  createCard,
} from "../store";
import { bindEvent } from "../utils/util";

export default function AddCardForm(index) {
  const componentName = "column-add-card-form";

  function onAddCardFormAddBtnClick(e) {
    const $textarea = document.querySelector(
      `div#${componentName}-wrapper-${index} textarea.column-card-content`
    );
    const value = $textarea.value;
    createCard({ content: value, index });
    toggleIsAddCardFormVisible(index);
  }

  function onAddCardFormCancelBtnClick(e) {
    toggleIsAddCardFormVisible(index);
  }

  function changeCardFormText(e) {
    return onCardFormTextChange(e.target.value);
  }

  function render() {
    const isAddCardFormVisible = getIsAddCardFormVisible(index);
    const html = `
        <div class="${componentName} ${isAddCardFormVisible ? "" : "hidden"}">
            <textarea class="column-card-content" placeholder="Write notes..." value="${getCardFormText()}"></textarea>
            <div class="column-card-btn">
                <button class="column-add-btn">Add</button>
                <button class="column-cancel-btn">Cancel</button>
            </div>
        </div>
        `;

    const $addCardFormWrapper = document.querySelector(
      `#${componentName}-wrapper-${index}`
    );
    $addCardFormWrapper.innerHTML = html;

    bindEvent(
      `div#${componentName}-wrapper-${index} textarea.column-card-content`,
      "input",
      changeCardFormText
    );
    bindEvent(
      `div#${componentName}-wrapper-${index} button.column-add-btn`,
      "click",
      onAddCardFormAddBtnClick
    );
    bindEvent(
      `div#${componentName}-wrapper-${index} button.column-cancel-btn`,
      "click",
      onAddCardFormCancelBtnClick
    );
  }

  subscribe(componentName, "cardFormText", render);
  setTimeout(render, 0);

  return `<div class=${componentName}-wrapper id="${
    componentName + "-wrapper-" + index
  }"></div>`;
}
