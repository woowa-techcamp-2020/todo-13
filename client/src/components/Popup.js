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
    const popup = makeElementWithClass("div", "popup");
    const popupContents = makeElementWithClass("div", "popup-contents");
    const message = makeElementWithClass("div", "popup-message");
    const btns = makeElementWithClass("div", "popup-btns");
    const confirm = makeElementWithClass("button", "popup-confirm", "확인");
    const cancel = makeElementWithClass("button", "popup-cancel", "취소");

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
