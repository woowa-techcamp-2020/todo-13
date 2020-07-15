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
  // 버튼 click action 추가
}

export function hidePopup() {
  const popup = document.querySelector(".popup");
  popup.style.display = "none";
  const message = document.querySelector(".popup-message");
  message.innerHTML = "";
}
