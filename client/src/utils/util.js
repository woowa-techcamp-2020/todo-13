export function bindEvent(className, event, action) {
  const element = document.querySelector(`.${className}`);
  if (!element) return;
  element.addEventListener(event, action);
  console.log(element);
};


export function makeElementWithClass({ elementType, className, content = "" }) {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.innerHTML = content;
  return element;
}

export function showPopup(msg) {
  const popup = document.querySelector(".popup");
  popup.style.display = "block";
  const message = document.querySelector(".popup-message");
  message.innerHTML = msg;
  // TODO: 버튼 click action 추가
}

export function hidePopup() {
  const popup = document.querySelector(".popup");
  popup.style.display = "none";
  const message = document.querySelector(".popup-message");
  message.innerHTML = "";
}

export function showModal(title, label, editContent = "") {
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Edit ${title}`;
  const modalNoteLabel = document.querySelector(".modal-note-label");
  modalNoteLabel.innerHTML = label;
  const modalNote = document.querySelector(".modal-note");
  modalNote.value = editContent;
  const modalConfirm = document.querySelector(".modal-confirm");
  modalConfirm.disabled = editContent ? false : true;
  // TODO: 버튼 click action 추가
  modalConfirm.addEventListener("click", () => console.log("edit save"));
  const popup = document.querySelector(".modal");
  popup.style.display = "block";
}

export function hideModal() {
  const title = document.querySelector(".modal-title");
  title.innerHTML = "Edit title";
  const modalNoteLabel = document.querySelector(".modal-note-label");
  modalNoteLabel.innerHTML = "Note";
  const modalNote = document.querySelector(".modal-note");
  modalNote.value = "";
  const popup = document.querySelector(".modal");
  popup.style.display = "none";
}
