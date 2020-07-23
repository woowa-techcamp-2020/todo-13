const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTES = 60 * 1000;
const SECONDS_IN_MINUTES = 60;
const SECONDS_IN_HOURS = 60 * 60;
const SECONDS_IN_DAYS = 24 * 60 * 60;

export function bindEvent(query, event, handler, capturing = false) {
  const element = document.querySelector(query);
  if (!element) return;
  // console.log(element, event)
  element.addEventListener(event, handler, capturing);
};

export function getTimeDifferenceInSecond(timestamp) {
  const timezoneOffset = (new Date()).getTimezoneOffset() * MILLISECONDS_IN_MINUTES;
  const localTime = new Date(Date.now() - timezoneOffset);

  return Math.abs(localTime - (new Date(timestamp))) / MILLISECONDS_IN_SECOND;
}

export function getCreatedAtMessage(timeDifferenceInSecond) {
  let message = "";
  // 1초~59초: 00 초 전 or 00 seconds ago
  // 1분~59분 59초: 00 분 전 or 00 minutes ago
  // 1시간~23시간: 00 시간 전 or 00 hours ago
  // 1일~ : 00일 전 or 00 days ago
  if (timeDifferenceInSecond < 5) {
    message = `few seconds ago`;
  } else if (timeDifferenceInSecond < SECONDS_IN_MINUTES) {
    message = `${Math.floor(timeDifferenceInSecond)} seconds ago`;
  } else if (timeDifferenceInSecond < SECONDS_IN_HOURS) {
    message = `${Math.floor(timeDifferenceInSecond/SECONDS_IN_MINUTES)} minutes ago`;
  } else if (timeDifferenceInSecond < SECONDS_IN_DAYS) {
    message = `${Math.floor(timeDifferenceInSecond/SECONDS_IN_HOURS)} hours ago`;
  } else {
    message = `${Math.floor(timeDifferenceInSecond/SECONDS_IN_DAYS)} days ago`;
  }

  return message;
}


export function makeElementWithClass({
  elementType,
  className,
  content = ""
}) {
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