import "./AddCardForm.scss";
import {
  getCardFormText,
  getIsAddCardFormVisible,
  subscribe,
  toggleIsAddCardFormVisible,
  onCardFormTextChange,
  createCard,
  getUserAuth,
} from "../store";
import { bindEvent } from "../utils/util";

export default function AddCardForm(index) {
  const componentName = "column-add-card-form";

  function onAddCardFormAddBtnClick(e) {
    const auth = getUserAuth();
    if (auth === "guest") {
      alert("로그인이 필요한 서비스입니다");
      toggleIsAddCardFormVisible(index);
      return;
    }
    
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
  
  function handleNullContent(e) {
    const $addBtn = document.querySelector(`div#${componentName}-wrapper-${index} .column-add-btn`);
    $addBtn.disabled = !e.target.value ? true : false;
  }

  function render() {
    const isAddCardFormVisible = getIsAddCardFormVisible(index);
    const html = `
        <div class="${componentName} ${isAddCardFormVisible ? "" : "hidden"}">
            <textarea class="column-card-content" placeholder="Write notes..." value="${getCardFormText()}"></textarea>
            <div class="column-card-btn">
                <button class="column-add-btn" disabled>Add</button>
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
    bindEvent(`div#${componentName}-wrapper-${index} .column-card-content`, "keyup", handleNullContent);
  }

  subscribe(componentName, "cardFormText", render);
  setTimeout(render, 0);

  return `<div class=${componentName}-wrapper id="${
    componentName + "-wrapper-" + index
  }"></div>`;
}
