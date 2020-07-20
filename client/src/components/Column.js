import "./Column.scss";
import Card from "./Card";
import {
  bindEvent
} from "../utils/util";
import MESSAGE from "../utils/messages";
import {
  getCards,
  subscribe,
  setModal,
  toggleModal,
  onCardFormTextChange,
  getCardFormText,
} from "../store";

// TODO: Separate Column component and AddCardForm component
//       , since Column component is too big

// TODO: Add drag and drop feature

export default function Column(props, index) {
  const componentName = `column-${index}`;
  let len;
  let isAddCardFormVisible = false;

  function onEditClick(e) {
    setModal({
      title: props.category,
      label: MESSAGE.COLUMN_NAME,
      content: props.category,
    });
    toggleModal();
  }

  function toggleAddCardForm() {
    isAddCardFormVisible = !isAddCardFormVisible;
    render();
  }

  function onAddCardBtnClick(e) {
    toggleAddCardForm();
  }

  function onAddCardFormAddBtnClick(e) {
    const $textarea = document.querySelector(`div#${componentName} textarea.column-card-content`);
    const value = $textarea.value;
    console.log(value);

    // TODO: add new Card component with value at the top of stack

    toggleAddCardForm();
  }

  function onAddCardFormCancelBtnClick(e) {
    toggleAddCardForm();
  }

  function changeCardFormText(e) {
    return onCardFormTextChange(e.target.value);
  }

  function render() {
    const cards = getCards().filter(card => card.category === props.category);
    len = cards.length;

    const html = `
      <div class="column-header">
        <div class="column-card-length">${len}</div>
        <div class="column-title">${props.category}</div>
        <div class="column-header-btns">
          <button class="column-edit">
            <ion-icon name='pencil-outline'></ion-icon>
          </button>
          <button class="column-add-card">
            ${isAddCardFormVisible? 
              "<ion-icon name='remove-circle-outline'></ion-icon>"
              :"<ion-icon name='add-circle-outline'></ion-icon>"}
          </button>
          <button class="column-delete">
            <ion-icon name='close-outline'></ion-icon>
          </button>
        </div>
      </div>
      <div class="column-add-card-form ${isAddCardFormVisible? '': 'hidden'}">
        <textarea class="column-card-content" placeholder="Write notes..." value="${getCardFormText()}"></textarea>
        <div class="column-card-btn">
          <button class="column-add-btn">Add</button>
          <button class="column-cancel-btn">Cancel</button>
        </div>
      </div>
      <div class="column-contents">
        ${cards.map((card, index) => {
          return Card({ card }, index);
        }).join('')}
      </div>
    `;

    const $column = document.querySelector(`#${componentName}`);
    $column.innerHTML = html;

    bindEvent(`div#${componentName} button.column-edit`, "click", onEditClick);
    bindEvent(`div#${componentName} button.column-add-card`, "click", onAddCardBtnClick);
    bindEvent(`div#${componentName} textarea.column-card-content`, "input", changeCardFormText);
    bindEvent(`div#${componentName} button.column-add-btn`, "click", onAddCardFormAddBtnClick);
    bindEvent(`div#${componentName} button.column-cancel-btn`, "click", onAddCardFormCancelBtnClick);
  }

  subscribe(componentName, 'cards', render);
  subscribe(componentName, "cardFormText", render);

  setTimeout(render, 0);

  return `<div class="column" id=${componentName}></div>`;
}

// export default class Column {
//   constructor($target, props) {
//     this.$target = $target;
//     this.title = props.title;
//     this.cardLeng = 0;
//     this.cardLengElement = "";

//     this.render();
//   }

//   paintCard(column) {
//     // TODO: 더미 데이터 받아보기
//     const contents = ["설정파일 분리 리팩토링 작업", "데모 환경 구성"];
//     const cardLeng = document.querySelector(".column-card-leng");
//     this.cardLeng = contents.length;
//     this.updateCardLength(this.cardLeng);
//     contents.forEach(
//       (content) => new Card(column, { category: this.title, content })
//     );
//   }

//   updateCardLength(length) {
//     this.cardLengElement.innerHTML = length;
//   }

//   render() {
//     const column = makeElementWithClass({
//       elementType: "div",
//       className: "column",
//     });

//     const columnHeader = makeElementWithClass({
//       elementType: "div",
//       className: "column-header",
//     });

//     const cardLeng = makeElementWithClass({
//       elementType: "div",
//       className: "column-card-leng",
//       content: this.cardLeng,
//     });

//     this.cardLengElement = cardLeng;

//     const title = makeElementWithClass({
//       elementType: "div",
//       className: "column-title",
//       content: this.title,
//     });

//     const columnHeaderBtns = makeElementWithClass({
//       elementType: "div",
//       className: "column-header-btns",
//     });

//     const editColumn = makeElementWithClass({
//       elementType: "button",
//       className: "column-edit",
//       content: "<ion-icon name='pencil-outline'></ion-icon>",
//     });

//     const addCard = makeElementWithClass({
//       elementType: "button",
//       className: "column-add-card",
//       content: "<ion-icon name='add-circle-outline'></ion-icon>",
//     });

//     const deleteColumn = makeElementWithClass({
//       elementType: "button",
//       className: "column-delete",
//       content: "<ion-icon name='close-outline'></ion-icon>",
//     });

//     const addCardForm = makeElementWithClass({
//       elementType: "div",
//       className: "column-add-card-form",
//     });

//     const cardContent = makeElementWithClass({
//       elementType: "textarea",
//       className: "column-card-content",
//     });
//     const btns = makeElementWithClass({
//       elementType: "div",
//       className: "column-card-btn",
//     });
//     const addBtn = makeElementWithClass({
//       elementType: "button",
//       className: "column-add-btn",
//       content: "Add",
//     });
//     const cancelBtn = makeElementWithClass({
//       elementType: "button",
//       className: "column-cancel-btn",
//       content: "Cancel",
//     });

//     columnHeaderBtns.appendChild(editColumn);
//     columnHeaderBtns.appendChild(addCard);
//     columnHeaderBtns.appendChild(deleteColumn);

//     columnHeader.appendChild(cardLeng);
//     columnHeader.appendChild(title);
//     columnHeader.appendChild(columnHeaderBtns);

//     btns.appendChild(addBtn);
//     btns.appendChild(cancelBtn);

//     cardContent.setAttribute("placeholder", "Write note...");
//     addCardForm.appendChild(cardContent);
//     addCardForm.appendChild(btns);

//     editColumn.addEventListener("click", () =>
//       showModal(this.title, MESSAGE.COLUMN_NAME, this.title)
//     );

//     addCard.addEventListener("click", () => {
//       if (addCardForm.style.display === "block") {
//         addCardForm.style.display = "none";
//         cardContent.value = "";
//         addCard.innerHTML = "<ion-icon name='add-circle-outline'></ion-icon>";
//       } else {
//         addCardForm.style.display = "block";
//         addCard.innerHTML =
//           "<ion-icon name='remove-circle-outline'></ion-icon>";
//       }
//     });

//     addBtn.addEventListener("click", () => {
//       // TODO: 카드 생성 액션 추가하기
//       console.log(cardContent.value);
//     });

//     cancelBtn.addEventListener("click", () => {
//       addCardForm.style.display = "none";
//       cardContent.value = "";
//       addCard.innerHTML = "<ion-icon name='add-circle-outline'></ion-icon>";
//     });

//     column.appendChild(columnHeader);
//     column.appendChild(addCardForm);

//     this.$target.appendChild(column);
//     this.paintCard(column);

//     function getDragAfterElement(container, y) {
//       const cards = [
//         ...container.querySelectorAll(".draggable:not(.dragging)"),
//       ];
//       return cards.reduce(
//         (closeset, child) => {
//           const boundingBox = child.getBoundingClientRect();
//           const offset = y - boundingBox.top - boundingBox.height / 2;

//           if (offset < 0 && offset > closeset.offset) {
//             return {
//               offset: offset,
//               element: child,
//             };
//           } else {
//             return closeset;
//           }
//         },
//         { offset: Number.NEGATIVE_INFINITY }
//       ).element;
//     }

//     column.addEventListener("dragover", (e) => {
//       e.preventDefault();
//       const afterElement = getDragAfterElement(column, e.clientY);
//       const draggingElement = document.querySelector(".dragging");

//       if (afterElement === null) {
//         column.appendChild(draggingElement);
//       } else {
//         column.insertBefore(draggingElement, afterElement);
//       }
//     });
//   }
// }