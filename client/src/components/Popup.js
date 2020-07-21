import {
  bindEvent
} from "../utils/util";
import "./Popup.scss";
import {
  getIsPopupVisible,
  subscribe,
  getPopupMessage,
  togglePopup,
  getTargetCardId,
  deleteCard,
  clearTargetCardId
} from "../store";

export default function Popup() {
  const componentName = 'popup'

  function onCancelBtnClick(e) {
    togglePopup();
  }

  function onConfirmBtnClick(e) {
    // delete Card
    const targetCardId = getTargetCardId();
    deleteCard(targetCardId);
    togglePopup();
    clearTargetCardId();
  }

  function render() {
    const isPopupVisible = getIsPopupVisible();
    const popupMessage = getPopupMessage();

    const html = `
    <div class="popup ${isPopupVisible ? '': 'hidden'}">
      <div class="popup-box">
        <div class="popup-message">
          ${popupMessage}
        </div>
        <div class="popup-btns">
          <button class="popup-confirm">확인</button>
          <button class="popup-cancel">취소</button>
        </div>
      </div>
    </div>
    `;

    const $popupWrapper = document.querySelector(`.popup-wrapper`);
    $popupWrapper.innerHTML = html;

    bindEvent(".popup-cancel", "click", onCancelBtnClick);
    bindEvent(".popup-confirm", "click", onConfirmBtnClick);
  }

  // subscribe(componentName, 'popupMessage', render);
  subscribe(componentName, 'isPopupVisible', render);

  setTimeout(render, 0);

  return `<div class=popup-wrapper></div>`;
}
