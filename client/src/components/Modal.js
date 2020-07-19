import {
  bindEvent
} from "../utils/util";
import "./Modal.scss";
import {
  subscribe,
  getIsModalVisibie,
  getModalData,
  toggleModal
} from "../store";

export default function Modal() {
  const componentName = "modal";

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

  function render() {
    const isModalVisible = getIsModalVisibie();
    const modalData = getModalData();
    const hasTextInput = true;

    const html = `
    <div class="${componentName} ${isModalVisible ? '': 'hidden'}">
      <div class="modal-box">
        <div class="modal-header">
          <p class="modal-title">Edit ${modalData.title}</p>
          <button class="modal-cancel">X</button>
        </div>
        <div class="modal-contents">
          <div class="modal-note-label">${modalData.label}</div>
          <textarea class="modal-note" maxlength=500 autofocus="autofocus" placeholer="입력해주세요">
            ${modalData.content}
          </textarea>
          <button class="modal-confirm" ${hasTextInput? "": "disabled"}>Save</button>
        </div>
      </div>
    </div>
    `;

    const $modal = document.querySelector(".modal-wrapper");
    $modal.innerHTML = html;

    bindEvent(".modal-cancel", "click", onCloseBtnClick);
    bindEvent(".modal", "click", onOutsideClick);
    bindEvent(".modal", "keyup", handleNullContent);
  }

  subscribe(componentName, "modal", render);
  subscribe(componentName, "isModalVisible", render);
  setTimeout(render, 0);

  return `<div class=modal-wrapper></div>`;
}

// export default class Modal {
//   constructor($target, props) {
//     this.$target = $target;

//     this.render();
//   }

//   render() {
//     const modal = makeElementWithClass({
//       elementType: "div",
//       className: "modal",
//     });
//     const modalBox = makeElementWithClass({
//       elementType: "div",
//       className: "modal-box",
//     });
//     const header = makeElementWithClass({
//       elementType: "div",
//       className: "modal-header",
//     });
//     const title = makeElementWithClass({
//       elementType: "p",
//       className: "modal-title",
//       content: "Edit title",
//     });
//     const cancel = makeElementWithClass({
//       elementType: "button",
//       className: "modal-cancel",
//       content: "X",
//     });
//     const contents = makeElementWithClass({
//       elementType: "div",
//       className: "modal-contents",
//     });
//     const noteLabel = makeElementWithClass({
//       elementType: "label",
//       className: "modal-note-label",
//       content: "Note",
//     });
//     const note = makeElementWithClass({
//       elementType: "textarea",
//       className: "modal-note",
//     });
//     const confirm = makeElementWithClass({
//       elementType: "button",
//       className: "modal-confirm",
//       content: "Save",
//     });

//     note.setAttribute("maxlength", 500);
//     note.setAttribute("autofocus", "autofocus");
//     note.setAttribute("placeholder", "입력해 주세요.");
//     header.appendChild(title);
//     header.appendChild(cancel);
//     contents.appendChild(noteLabel);
//     contents.appendChild(note);
//     contents.appendChild(confirm);
//     modalBox.appendChild(header);
//     modalBox.appendChild(contents);
//     modal.appendChild(modalBox);
//     this.$target.appendChild(modal);

//     cancel.addEventListener("click", hideModal);

//     note.addEventListener(
//       "keyup",
//       (e) => (confirm.disabled = !e.target.value ? true : false)
//     );

//     modal.addEventListener("click", (e) => {
//       if (e.target === modal) {
//         hideModal();
//       }
//     });
//   }
// }