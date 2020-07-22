import * as Data from "./Data";
import {
  fetchCardsFromDB,
  insertCreatedCardIntoDB,
  getLatestCardIdFromDB,
  updateMovedCardInfo,
} from "./services/cardService";
import { fetchActivitiesFromDB } from "./services/activityService";

export const state = {
  categories: {
    data: ["해야할 일", "하는 중", "다 했어"],
    listeners: {},
  },
  cards: {
    data: [],
    listeners: {},
  },
  items: {
    data: [],
    listeners: {},
  },
  popupMessage: {
    data: "",
    listeners: {},
  },
  modal: {
    data: {}, // title, label, editContent
    listeners: {},
  },
  cardFormText: {
    data: "",
    listeners: {},
  },
  isSidebarVisible: {
    data: "",
    listeners: {},
  },
  isModalVisible: {
    data: false,
    listeners: {},
  },
  isPopupVisible: {
    data: false,
    listeners: {},
  },
  isAddCardFormVisible: {
    data: [false, false, false],
    listeners: {},
  },
  targetCardId: {
    data: Number.NEGATIVE_INFINITY,
    listeners: {},
  },
  targetCardXY: {
    data: {},
    listeners: {},
  },
  targetColumnId: {
    data: Number.NEGATIVE_INFINITY,
    listeners: {},
  },
};

export const subscribe = (component, key, eventHandler) => {
  state[key].listeners[component] = eventHandler;
};

const publish = (key) =>
  Object.values(key.listeners).forEach((eventHandler) =>
    eventHandler(key.data)
  );

export function getCategories() {
  return state.categories.data;
}

export function updateCategories(idx, value) {
  state.cards.data.map((card) => {
    if (card.category === state.categories.data[idx]) {
      card.category = value;
    }
  });
  state.categories.data[idx] = value;

  publish(state.cards);
  publish(state.categories);
}

export function getIsSidebarVisible() {
  return state.isSidebarVisible.data;
}

export function getItems() {
  return state.items.data;
}

export async function fetchItems() {
  state.items.data = await fetchActivitiesFromDB();
  publish(state.items);
}

export function toggleSidebar(val) {
  state.isSidebarVisible.data = val;
  publish(state.isSidebarVisible);
}

export async function fetchCards() {
  state.cards.data = await fetchCardsFromDB();
  publish(state.cards);
}

export function getCards() {
  return state.cards.data;
}

export async function createCard(cardData) {
  const newCard = {
    author: "Jason", // TODO: get loggined User data
    content: cardData.content,
    category: state.categories.data[cardData.index],
  };
  await insertCreatedCardIntoDB(newCard);

  const latestId = await getLatestCardIdFromDB();
  newCard.id = latestId + 1;
  console.log(latestId);

  state.cards.data.unshift(newCard);
  state.items.data.unshift({
    username: "user1",
    action: `added ${cardData.content}`,
    last_updated: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  publish(state.cards);
  publish(state.items);
}

export function updateCard(id, content) {
  state.cards.data.forEach((card) => {
    if (card.id === id) {
      card.content = content;
      state.items.data.unshift({
        username: card.author,
        action: `updated ${content}`,
        last_updated: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
    }
  });
  publish(state.cards);
  publish(state.items);

  // TODO: call [BE] PUT or PATCH 'card/{id}' API
}

export async function moveCard(data) {
  const {
    cardId,
    prevColumn,
    orderInPrevColumn,
    nextColumn,
    orderInNextColumn,
  } = data;

  await updateMovedCardInfo(cardId, {
    prevColumn,
    orderInPrevColumn,
    nextColumn,
    orderInNextColumn,
  });

  state.cards.data = await fetchCardsFromDB();
  publish(state.cards);
  publish(state.items);
}

export function deleteCard(id) {
  let deletedCard;
  state.cards.data = state.cards.data
    .map((card) => {
      if (card.id === id) {
        deletedCard = card;
        return null;
      }
      return card;
    })
    .filter((card) => card !== null);

  state.items.data.unshift({
    username: deletedCard.author,
    action: `deleted ${deletedCard.content}`,
    last_updated: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  publish(state.cards);
  publish(state.items);

  // TODO: call [BE] DELETE 'card/{id}' API
}

export function getTargetCardId() {
  return state.targetCardId.data;
}

export function setTargetCardId(value) {
  state.targetCardId.data = value;
  publish(state.targetCardId);
}

export function getTargetCardXY() {
  return state.targetCardXY.data;
}

export function setTargetCardXY(xy) {
  state.targetCardXY.data = xy;
  publish(state.targetCardXY);
}

export function getTargetCardData(id) {
  const cardsData = getCards();
  const cardData = cardsData.filter((item) => item.id === parseInt(id));

  return cardData[0];
}

export function clearTargetCardId() {
  state.targetCardId.data = Number.NEGATIVE_INFINITY;
}

export function getTargetColumnId() {
  return state.targetColumnId.data;
}

export function setTargetColumnId(value) {
  state.targetColumnId.data = value;
  publish(state.targetColumnId);
}

export function clearTargetColumnId() {
  state.targetColumnId.data = Number.NEGATIVE_INFINITY;
}

export function getPopupMessage() {
  return state.popupMessage.data;
}

export function setPopupMessage(value) {
  state.popupMessage.data = value;
  publish(state.popupMessage);
}

export function getIsPopupVisible() {
  return state.isPopupVisible.data;
}

export function togglePopup() {
  state.isPopupVisible.data = !state.isPopupVisible.data;
  publish(state.isPopupVisible);
}

export function getIsModalVisibie() {
  return state.isModalVisible.data;
}

export function toggleModal() {
  state.isModalVisible.data = !state.isModalVisible.data;
  publish(state.isModalVisible);
}

export function setModal(data) {
  state.modal.data = data;
  publish(state.modal);
}

export function getModalData() {
  return state.modal.data;
}

export function getCardFormText() {
  return state.cardFormText.data;
}

export function onCardFormTextChange(value) {
  state.cardFormText.data = value;
}

export function clearCardFormText() {
  state.cardFormText.data = "";
  publish(state.cardFormText);
}

export function getIsAddCardFormVisible(idx) {
  return state.isAddCardFormVisible.data[idx];
}

export function toggleIsAddCardFormVisible(idx) {
  state.isAddCardFormVisible.data[idx] = !state.isAddCardFormVisible.data[idx];
  publish(state.isAddCardFormVisible);
}
