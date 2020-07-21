import "./Dashboard.scss";
import Column from "./Column";
import CopyCard from "./CopyCard";
import {
  fetchCards,
  getCategories,
  subscribe,
  setModal,
  toggleIsAddCardFormVisible,
  toggleModal,
  deleteCard,
  getTargetCardId,
  setTargetCardId,
  getTargetCardData,
  getTargetCardXY,
  setTargetCardXY,
} from "../store";
import { bindEvent } from "../utils/util";
import MESSAGE from "../utils/messages";

export default function Dashboard() {
  const componentName = "dashboard";

  function onCardMouseDown(e) {
    if (e.target.closest(".card")) {
      const $card = e.target.closest(".card");
      $card.classList.add("card-click");
      const cardId = $card.id.split("-")[1];
      const cardData = getTargetCardData(cardId);
      setTargetCardId(parseInt(cardId));

      const copyCard = document.querySelector(".card-copy");
      copyCard.style.display = "block";
      copyCard.style.width = `${$card.offsetWidth}px`;
      const cardXY = $card.getBoundingClientRect();
      copyCard.style.top = `${event.clientY - (event.clientY - cardXY.y)}px`;
      copyCard.style.left = `${event.clientX - (event.clientX - cardXY.x)}px`;
      setTargetCardXY({
        x: event.clientX - cardXY.x,
        y: event.clientY - cardXY.y,
      });
      const copyCardContent = copyCard.querySelector(".card-text");
      copyCardContent.textContent = cardData.content;
      const copyCardAuthor = copyCard.querySelector(".card-author");
      copyCardAuthor.innerText = cardData.author;
    }
  }

  function onCardMouseUp(e) {
    if (e.target.closest(".card-copy")) {
      const card = document.querySelector(`#card-${getTargetCardId()}`);
      card.classList.remove("card-click");
      e.target.closest(".card-copy").style.display = "none";
    }
  }

  function offCopyCard() {
    const copyCard = document.querySelector(".card-copy");
    if (copyCard.style.display === "block") {
      copyCard.style.display = "none";
      const card = document.querySelector(`#card-${getTargetCardId()}`);
      if (card.classList.contains("card-click"))
        card.classList.remove("card-click");
    }
  }

  function onCardMouseMove(e) {
    if (!e.target.closest(".card-copy")) {
      offCopyCard();
    } else {
      const card = document.querySelector(`#card-${getTargetCardId()}`);
      const copyCard = document.querySelector(".card-copy");

      const cardXY = getTargetCardXY();
      // 마우스 위치에 위치 시키기
      copyCard.style.top = `${event.clientY - parseInt(cardXY.y)}px`;
      copyCard.style.left = `${event.clientX - parseInt(cardXY.x)}px`;

      // 원래 카드 위치 옮기기 - 다음, 이전 element에 넣어주기
      const prevNode = card.previousSibling;
      const nextNode = card.nextSibling;

      // 위로 올라갈 때 - 이동하는 카드가 잔상 카드높이가 카드의 높이갚만큼 감소됐을 때
      if (copyCard.offsetTop < card.offsetTop - card.offsetHeight) {
        if (!prevNode) {
          card.parentNode.insertBefore(card, card.parentNode.firstChild);
        } else {
          card.parentNode.insertBefore(card, prevNode.previousSibling);
        }
      }

      // 아래로 내려갈 때 - 이동하는 카드가 잔상 카드높이가 카드의 높이갚만큼 더해졌을 때
      if (copyCard.offsetTop > card.offsetTop + card.offsetHeight) {
        if (!nextNode) {
          card.parentNode.appendChild(card);
        } else {
          card.parentNode.insertBefore(card, nextNode.nextSibling);
        }
      }

      // 다른 컬럼에 추가
      const columnContentsNode = card.parentNode;
      const columnNode = card.parentNode.parentNode;
      const cardPrevParent = columnNode.previousSibling;
      const cardNextParent = columnNode.nextSibling;
      // 카드가 왼쪽으로 이동할 때
      if (
        copyCard.offsetLeft <=
        columnNode.offsetLeft - columnNode.offsetWidth / 2 - 20
      ) {
        if (
          cardPrevParent.classList &&
          cardPrevParent.classList.contains("column")
        ) {
          const prevColumnContents = cardPrevParent.querySelector(
            ".column-contents"
          );
          prevColumnContents.appendChild(card);
        } else {
          columnContentsNode.appendChild(card);
        }
      }

      if (
        copyCard.offsetLeft >
        columnNode.offsetLeft + columnNode.offsetWidth / 2 + 20
      ) {
        //카드가 오른쪽으로 이동할 때
        if (
          copyCard.offsetLeft >=
          columnNode.offsetLeft + columnNode.offsetWidth / 2
        ) {
          if (
            cardNextParent.classList &&
            cardNextParent.classList.contains("column")
          ) {
            const nextColumnContents = cardNextParent.querySelector(
              ".column-contents"
            );
            nextColumnContents.appendChild(card);
          } else {
            columnContentsNode.appendChild(card);
          }
        }
      }
      // TODO : 카드가 옮겨질 때 카드의 id를 바꿔주어야 할 것 같다..!
    }
  }

  function onColumnAddCardClick(e) {
    const addCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="add-circle-outline"]'
      ),
    ];
    const removeCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="remove-circle-outline"]'
      ),
    ];
    const cardCtrlBtns = addCardBtns.concat(removeCardBtns);

    if (cardCtrlBtns.includes(e.target)) {
      const $column = e.target.closest(".column");
      const index = $column.id.split("-")[1];

      toggleIsAddCardFormVisible(index);
    }
  }

  function onColumnTitleEditClick(e) {
    const editCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="pencil-outline"]'
      ),
    ];
    if (editCardBtns.includes(e.target)) {
      const $columnHeader = e.target.closest(".column-header");
      const title = $columnHeader.childNodes[3].innerText;

      setModal({
        title,
        label: MESSAGE.COLUMN_NAME,
        content: title,
      });
      toggleModal();
    }
  }

  function onBtnMouseEnter(e) {
    const addCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="add-circle-outline"]'
      ),
    ];
    const closeBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="close-outline"]'
      ),
    ];
    if (addCardBtns.includes(e.target) || closeBtns.includes(e.target)) {
      e.target.style.background = "lightgray";
    }
  }

  function onBtnMouseOut(e) {
    const addCardBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="add-circle-outline"]'
      ),
    ];
    const closeBtns = [
      ...document.querySelectorAll(
        'ion-icon.md.hydrated[name="close-outline"]'
      ),
    ];
    if (addCardBtns.includes(e.target) || closeBtns.includes(e.target)) {
      e.target.style.background = "white";
    }
  }

  function render() {
    const categories = getCategories();
    const copycard = CopyCard();
    const html = `
    <div class="columnBox">
      ${categories
        .map((category, index) => {
          return Column({ category }, index);
        })
        .join("")}
        ${copycard}
    </div>
    `;

    const $dashboard = document.querySelector(`.${componentName}`);
    $dashboard.innerHTML = html;

    bindEvent(`section.${componentName}`, "click", onColumnTitleEditClick);
    bindEvent(`section.${componentName}`, "click", onColumnAddCardClick);
    bindEvent(`section.${componentName}`, "mouseenter", onBtnMouseEnter, true);
    bindEvent(`section.${componentName}`, "mouseout", onBtnMouseOut, true);
    bindEvent(`section.${componentName}`, "mousedown", onCardMouseDown);
    bindEvent(`section.${componentName}`, "mouseup", onCardMouseUp);
    bindEvent(`section.${componentName}`, "mousemove", onCardMouseMove);

    document.addEventListener("mouseout", (e) => {
      if (e.toElement == null && e.relatedTarget == null) {
        offCopyCard();
      }
    });
  }

  fetchCards();

  subscribe(componentName, "categories", render);

  setTimeout(render, 0);

  return `<section class=${componentName}></section>`;
}
