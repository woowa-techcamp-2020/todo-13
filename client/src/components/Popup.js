import { makeElementWithClass } from "../utils/util";
import "./Popup.scss";

export default class Popup {
  constructor($target, props) {
    this.$target = $target;

    this.render();
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    const popup = makeElementWithClass({
      elementType: "div",
      className: "popup",
    });
    const popupContents = makeElementWithClass({
      elementType: "div",
      className: "popup-contents",
    });
    const message = makeElementWithClass({
      elementType: "div",
      className: "popup-message",
    });
    const btns = makeElementWithClass({
      elementType: "div",
      className: "popup-btns",
    });
    const confirm = makeElementWithClass({
      elementType: "button",
      className: "popup-confirm",
      content: "확인",
    });
    const cancel = makeElementWithClass({
      elementType: "button",
      className: "popup-cancel",
      content: "취소",
    });

    btns.appendChild(confirm);
    btns.appendChild(cancel);
    popupContents.appendChild(message);
    popupContents.appendChild(btns);
    popup.appendChild(popupContents);
    this.$target.appendChild(popup);

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
        message.innerHTML = "";
      }
    });
  }
}
