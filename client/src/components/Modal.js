import {
  bindEvent
} from "../utils/util";
import "./Modal.scss";
import {
  subscribe,
  getIsModalVisibie,
  getModalData,
  toggleModal,
  onCardEditTextChange,
  updateCard,
  getTargetCardId
} from "../store";

export default function Modal() {
  const componentName = "modal";

  function onSaveBtnClick(e) {
    // update card content
    const $modalContents = e.target.closest("div.modal-contents");
    const cardId = getTargetCardId();
    const $modalNote = $modalContents.childNodes[3];
    const editContent = $modalNote.value;

    updateCard(parseInt(cardId), editContent);
    toggleModal();
  }

  function onCloseBtnClick(e) {
    toggleModal();
  }

  function onOutsideClick(e) {
    const $modal = document.querySelector(".modal");
    if (e.target === $modal) toggleModal();
  }

  function handleNullContent(e) {
    const $modalConfirm = document.querySelector(".modal-confirm");
    $modalConfirm.disabled = (!e.target.value) ? true : false;
  }


  function onCloseBtnMouseEnter(e) {
    const closeBtns = [...document.querySelectorAll("ion-icon.md.hydrated[name=\"close-outline\"]")];
    if (closeBtns.includes(e.target)) {
      e.target.style.background = "lightgray";
    }
  }

  function onCloseBtnMouseOut(e) {
    const closeBtns = [...document.querySelectorAll("ion-icon.md.hydrated[name=\"close-outline\"]")];
    if (closeBtns.includes(e.target)) {
      e.target.style.background = "white";
    }
  }

  function render() {
    const isModalVisible = getIsModalVisibie();
    const modalData = getModalData();
    const hasTextInput = true;

    const html = `
    <div class="${componentName} ${isModalVisible ? '': 'hidden'}">
      <div class="modal-box">
        <div class="modal-header">
          <p class="modal-title">Edit ${modalData.title}</p>
          <button class="modal-cancel">
            <ion-icon name='close-outline'></ion-icon>
          </button>
        </div>
        <div class="modal-contents">
          <div class="modal-note-label">${modalData.label}</div>
          <textarea class="modal-note"
            maxlength=500
            autofocus=true
            placeholer="입력해주세요">${modalData.content}</textarea>
          <button class="modal-confirm" 
            ${hasTextInput? "": "disabled"}>
            Save
          </button>
        </div>
      </div>
    </div>
    `;

    const $modal = document.querySelector(".modal-wrapper");
    $modal.innerHTML = html;

    bindEvent(".modal-confirm", "click", onSaveBtnClick);
    bindEvent(".modal-cancel", "click", onCloseBtnClick);
    bindEvent(`div.${componentName}`, "mouseenter", onCloseBtnMouseEnter, true);
    bindEvent(`div.${componentName}`, "mouseout", onCloseBtnMouseOut, true);
    bindEvent(".modal", "click", onOutsideClick);
    bindEvent(".modal", "keyup", handleNullContent);
  }

  subscribe(componentName, "isModalVisible", render);
  
  setTimeout(render, 0);

  return `<div class=modal-wrapper></div>`;
}
