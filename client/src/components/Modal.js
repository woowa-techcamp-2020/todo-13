import { makeElementWithClass, hideModal } from "../utils/util";
import "./Modal.scss";

export default class Modal {
  constructor($target, props) {
    this.$target = $target;

    this.render();
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    const modal = makeElementWithClass({
      elementType: "div",
      className: "modal",
    });
    const modalBox = makeElementWithClass({
      elementType: "div",
      className: "modal-box",
    });
    const header = makeElementWithClass({
      elementType: "div",
      className: "modal-header",
    });
    const title = makeElementWithClass({
      elementType: "p",
      className: "modal-title",
      content: "Edit title",
    });
    const cancel = makeElementWithClass({
      elementType: "button",
      className: "modal-cancel",
      content: "X",
    });
    const contents = makeElementWithClass({
      elementType: "div",
      className: "modal-contents",
    });
    const noteLabel = makeElementWithClass({
      elementType: "label",
      className: "modal-note-label",
      content: "Note",
    });
    const note = makeElementWithClass({
      elementType: "textarea",
      className: "modal-note",
    });
    const confirm = makeElementWithClass({
      elementType: "button",
      className: "modal-confirm",
      content: "Save",
    });

    note.setAttribute("maxlength", 500);
    note.setAttribute("autofocus", "autofocus");
    note.setAttribute("placeholder", "입력해 주세요.");
    header.appendChild(title);
    header.appendChild(cancel);
    contents.appendChild(noteLabel);
    contents.appendChild(note);
    contents.appendChild(confirm);
    modalBox.appendChild(header);
    modalBox.appendChild(contents);
    modal.appendChild(modalBox);
    this.$target.appendChild(modal);

    cancel.addEventListener("click", hideModal);

    note.addEventListener(
      "keyup",
      (e) => (confirm.disabled = !e.target.value ? true : false)
    );

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });
  }
}
