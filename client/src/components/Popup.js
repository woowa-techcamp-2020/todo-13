import { makeElementWithClass, bindEvent } from "../utils/util";
import "./Popup.scss";
import { getIsPopupVisible, subscribe, getPopupMessage, togglePopup, toggleSidebar } from "../store";

export default function Popup() {
  const componentName = 'popup'

  function onCancelBtnClick(e) {
    togglePopup();
  }

  function onConfirmBtnClick(e) {
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

  subscribe(componentName, 'popupMessage', render);
  subscribe(componentName, 'isPopupVisible', render);

  setTimeout(render, 0);

  return `<div class=popup-wrapper></div>`;
}

// export default class Popup {
//   constructor($target, props) {
//     this.$target = $target;

//     this.render();
//   }

//   setState(data) {
//     this.data = data;
//     this.render();
//   }

//   render() {
//     const popup = makeElementWithClass({
//       elementType: "div",
//       className: "popup",
//     });
//     const popupBox = makeElementWithClass({
//       elementType: "div",
//       className: "popup-box",
//     });
//     const message = makeElementWithClass({
//       elementType: "div",
//       className: "popup-message",
//     });
//     const btns = makeElementWithClass({
//       elementType: "div",
//       className: "popup-btns",
//     });
//     const confirm = makeElementWithClass({
//       elementType: "button",
//       className: "popup-confirm",
//       content: "확인",
//     });
//     const cancel = makeElementWithClass({
//       elementType: "button",
//       className: "popup-cancel",
//       content: "취소",
//     });

//     btns.appendChild(confirm);
//     btns.appendChild(cancel);
//     popupBox.appendChild(message);
//     popupBox.appendChild(btns);
//     popup.appendChild(popupBox);
//     this.$target.appendChild(popup);

//     popup.addEventListener("click", (e) => {
//       if (e.target === popup) {
//         popup.style.display = "none";
//         message.innerHTML = "";
//       }
//     });
//   }
// }
