import { bindEvent } from "../utils/util";
import "./Modal.scss";
import {
  subscribe,
  getIsModalVisibie,
  getModalData,
  toggleModal,
  getTargetColumnId,
  updateCard,
  getTargetCardId,
  updateCategories,
  clearTargetCardId,
  clearTargetColumnId,
  getUserAuth,
} from "../store";

export default function Modal() {
  const componentName = "modal";

  function onSaveBtnClick(e) {
    const auth = getUserAuth();

    const $modalContents = e.target.closest("div.modal-contents");
    const $modalNote = $modalContents.childNodes[3];
    const editContent = $modalNote.value;

    const columnId = getTargetColumnId();
    if (columnId !== Number.NEGATIVE_INFINITY) {
      // 컬럼 제목 수정하는 경우
      if (auth !== "admin") {
        alert(
          `${
            auth === "guest"
              ? "로그인이 필요한 서비스입니다"
              : "수정 권한이 없습니다"
          }`
        );
        toggleModal();
        clearTargetColumnId();
        return;
      }
      updateCategories(columnId, editContent);
      clearTargetColumnId();
    } else {
      // 카드 내용 수정하는 경우
      if (auth === "guest") {
        alert("로그인이 필요한 서비스입니다");
        toggleModal();
        clearTargetCardId();
        return;
      }
      const cardId = getTargetCardId();
      updateCard(parseInt(cardId), editContent);
      clearTargetCardId();
    }

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
    $modalConfirm.disabled = !e.target.value ? true : false;
  }

  function onCloseBtnMouseEnter(e) {
    const closeBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="close-outline"]'
      ),
    ];
    if (closeBtns.includes(e.target)) {
      e.target.style.background = "lightgray";
    }
  }

  function onCloseBtnMouseOut(e) {
    const closeBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="close-outline"]'
      ),
    ];
    if (closeBtns.includes(e.target)) {
      e.target.style.background = "white";
    }
  }

  function render() {
    const isModalVisible = getIsModalVisibie();
    const modalData = getModalData();

    const html = `
    <div class="${componentName} ${isModalVisible ? "" : "hidden"}">
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
          <button class="modal-confirm">
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
