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
  getTargetCardId,
  setTargetCardId,
  getTargetCardData,
  getTargetCardXY,
  setTargetCardXY,
  moveCard,
  setTargetColumnId,
  clearTargetCardId,
  fetchCategories,
  getUserAuth,
} from "../store";
import { bindEvent } from "../utils/util";
import MESSAGE from "../utils/messages";

export default function Dashboard() {
  const componentName = "dashboard";

  function onCardMouseDown(e) {
    const cardCloseBtns = [
      ...document.querySelectorAll(
        `div.card ion-icon.md.hydrated[name=\"close-outline\"]`
      ),
    ];
    const isDoubleClick = e.detail !== 1;
    const hasClickedCloseBtn = cardCloseBtns.includes(e.target);

    if (!isDoubleClick && !hasClickedCloseBtn && e.target.closest(".card")) {
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
      const auth = getUserAuth();

      if (auth === "guest") {
        alert("로그인이 필요한 서비스입니다");
        offCopyCard();
        clearTargetCardId();
        return;
      }
      const cardId = getTargetCardId();
      const card = document.querySelector(`#card-${cardId}`);
      // 1. card가 옮겨진 컬럼과 위치를 찾는다.
      // (현재 컬럼 정보, 이전 순서, 옮겨진 컬럼 정보, 이전 순서)
      const prevCardData = getTargetCardData(cardId);
      const moveCardPrevNode = card.previousElementSibling;
      const moveCardNextNode = card.nextElementSibling;

      const nextCardId = moveCardPrevNode && moveCardPrevNode.id.split("-")[1];
      const column = card.parentElement.parentElement;

      let nextCardData = getTargetCardData(nextCardId);
      let nextColumn = column.querySelector(".column-title").innerText;
      let orderInNextColumn = parseInt(
        column.querySelector(".column-card-length").innerText
      );

      card.classList.remove("card-click");
      e.target.closest(".card-copy").style.display = "none";

      // TODO : 너무 복잡한 if 구조... 리팩토링 하기!
      if (prevCardData.category === nextColumn) {
        if (orderInNextColumn === prevCardData.order_in_column) return;
        if (prevCardData.order_in_column < orderInNextColumn) {
          if (moveCardPrevNode) {
            orderInNextColumn = nextCardData.order_in_column - 1;
            nextColumn = nextCardData.category;
          }
        } else {
          orderInNextColumn = nextCardData.order_in_column;
          nextColumn = nextCardData.category;
        }
      } else {
        if (moveCardPrevNode) {
          orderInNextColumn = nextCardData.order_in_column;
          nextColumn = nextCardData.category;
        } else {
          orderInNextColumn = orderInNextColumn + 1;
        }
      }

      // 2. 데이터를 취합하여 moveCard를 호출한다.
      const data = {
        cardId,
        prevColumn: prevCardData.category,
        orderInPrevColumn: prevCardData.order_in_column,
        nextColumn,
        orderInNextColumn,
      };

      if (
        prevCardData.category === nextColumn &&
        orderInNextColumn === data.orderInPrevColumn
      )
        return;

      moveCard(data);
      clearTargetCardId();
    }
  }

  function offCopyCard() {
    const copyCard = document.querySelector(".card-copy");
    if (copyCard.style.display === "block") {
      // TODO : 카드가 원래 자리로 돌아오게 하기..
      // 첫번째 : 카드의 원래 자리를 저장해 두었다가 다시 제자리로 놓는다.
      // 두번째 : 카드 정보를 다시 불러온다.
      // 일단은 두번째 방법을 사용하고 리팩토링 하기로 하자..
      copyCard.style.display = "none";
      const card = document.querySelector(`#card-${getTargetCardId()}`);
      if (card.classList.contains("card-click")) {
        card.classList.remove("card-click");
        fetchCards();
      }
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

      // columnBox 안에서만 카드 이동하게
      // TODO : columnBox를 찾아서 마우스의 위치가 컬럼박스 내 일 경우에만 옮길 수 있게 리팩토링
      const columnBox = document.querySelector(".columnBox");
      const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = columnBox;
      const { pageX, pageY } = event;
      if (
        pageX > offsetLeft &&
        pageX < offsetLeft + offsetWidth &&
        pageY > offsetTop &&
        pageY < offsetTop + offsetHeight
      ) {
        // 원래 카드 위치 옮기기 - 다음, 이전 element에 넣어주기
        const prevNode = card.previousSibling;
        const nextNode = card.nextSibling;

        // 위로 올라갈 때 - 이동하는 카드가 잔상 카드높이가 카드의 높이갚만큼 감소됐을 때
        if (copyCard.offsetTop < card.offsetTop - card.offsetHeight - 10) {
          if (prevNode) {
            card.parentNode.insertBefore(card, prevNode);
          }
        }

        // 아래로 내려갈 때 - 이동하는 카드가 잔상 카드높이가 카드의 높이갚만큼 더해졌을 때
        if (copyCard.offsetTop > card.offsetTop + card.offsetHeight + 10) {
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
          }
        }

        //카드가 오른쪽으로 이동할 때
        if (
          copyCard.offsetLeft >
          columnNode.offsetLeft + columnNode.offsetWidth / 2 + 20
        ) {
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
            }
          }
        }
      }
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
      const title = $columnHeader.childNodes[3].innerHTML;

      const $column = e.target.closest("div.column");
      const columnId = $column.id.split("-")[1];

      setTargetColumnId(parseInt(columnId));

      setModal({
        title,
        label: MESSAGE.COLUMN_NAME,
        content: title,
      });
      toggleModal();
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
        .map((category) => {
          return Column({ category });
        })
        .join("")}
        ${copycard}
    </div>
    `;

    const $dashboard = document.querySelector(`.${componentName}`);
    $dashboard.innerHTML = html;

    bindEvent(`section.${componentName}`, "click", onColumnTitleEditClick);
    bindEvent(`section.${componentName}`, "click", onColumnAddCardClick);
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

  fetchCategories();
  fetchCards();

  subscribe(componentName, "categories", render);

  setTimeout(render, 0);

  return `<section class=${componentName}></section>`;
}
