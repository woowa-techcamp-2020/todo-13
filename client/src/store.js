import {
  fetchCardsFromDB,
  insertCreatedCardIntoDB,
  getLatestCardIdFromDB,
  updateMovedCardInfo,
  deleteCardInDB,
  updateCardContentInDB,
} from "./services/cardService";
import { fetchActivitiesFromDB } from "./services/activityService";
import { fetchColumnsFromDB, updateColumnTitleInDB } from "./services/columnService";
import { getCreatedAtMessage, getTimeDifferenceFromNow } from "./utils/util";

export const state = {
  categories: {
    data: [], //  {id: , column_name: }
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
  isAddCardFormVisible: { // { id: , isVisible, }
    data: [],
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

export async function fetchCategories() {
  state.categories.data = await fetchColumnsFromDB();
  publish(state.categories);

  state.isAddCardFormVisible.data = state.categories.data.map((category) => {
    return { id: category.id, isVisible: false };
  });
  publish(state.isAddCardFormVisible);
}

export function getCategories() {
  return state.categories.data;
}

export async function updateCategories(idx, value) {
  const oldColumnName = state.categories.data.filter(item => item.id === idx)[0].column_name;

  state.categories.data = state.categories.data.map(item => {
    if (item.id === parseInt(idx)) {
      return { id: item.id, column_name: value};
    }
    return item;
  });

  publish(state.categories);

  state.cards.data.map((card) => {
    if (card.category === oldColumnName) {
      card.category = value;
    }
  });

  publish(state.cards);

  await updateColumnTitleInDB(idx, {username: "Jason", column_name: value});
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
  state.cards.data.sort((a, b) => b.order_in_column - a.order_in_column);
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

  state.cards.data.unshift(newCard);
  publish(state.cards);

  state.items.data.unshift({
    username: newCard.author,
    content: `added ${newCard.content}`,
    created_at: getCreatedAtMessage(getTimeDifferenceFromNow(new Date())),
  });
  publish(state.items);
}

export async function updateCard(id, content) {
  let author = "";
  state.cards.data.forEach((card) => {
    if (card.id === id) {
      card.content = content;
      author = card.author;
      state.items.data.unshift({
        username: card.author,
        content: `updated ${content}`,
        created_at: getCreatedAtMessage(getTimeDifferenceFromNow(new Date())),
      });
    }
  });

  publish(state.cards);
  publish(state.items);

  // TODO: call [BE] PUT or PATCH 'card/{id}' API
  await updateCardContentInDB(id, {
    author,
    content,
  });
}

export async function moveCard(data) {
  // 카드의 순서와 이동한 컬럼으로 카테고리 값 바꿔주기
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

export async function deleteCard(id) {
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
    content: `removed ${deletedCard.content}`,
    created_at: getCreatedAtMessage(getTimeDifferenceFromNow(new Date())),
  });

  publish(state.cards);
  publish(state.items);

  await deleteCardInDB(id);
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

export function getIsAddCardFormVisible(id) {
  const target = state.isAddCardFormVisible.data.filter(item => item.id === id);
  return target[0].isVisible;
}

export function toggleIsAddCardFormVisible(idx) {
  state.isAddCardFormVisible.data = state.isAddCardFormVisible.data.map(item => {
    if (item.id === parseInt(idx)) {
      return {id: item.id, isVisible: !item.isVisible};
    }
    return item;
  })
  publish(state.isAddCardFormVisible);
}
