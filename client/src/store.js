import * as Data from "./Data";

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
    data: false,
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

export function getIsSidebarVisible() {
  return state.isSidebarVisible.data;
}

export function getItems() {
  return state.items.data;
}

export async function fetchItems() {
  state.items.data = await Data.fetchActivities();
  publish(state.items);
}

export function toggleSidebar() {
  state.isSidebarVisible.data = !state.isSidebarVisible.data;
  publish(state.isSidebarVisible);
}

export async function fetchCards() {
  state.cards.data = await Data.fetchCards();
  publish(state.cards);
}

export function getCards() {
  return state.cards.data;
}

export function createCard(cardData) {
  const lastId = state.cards.data.reduce(
    (acc, cur) => Math.max(acc, cur.id),
    0
  );
  state.cards.data.unshift({
    id: lastId + 1,
    author: "user1",
    last_updated: new Date().toISOString().slice(0, 19).replace("T", " "),
    content: cardData.content,
    category: state.categories.data[cardData.index],
  });

  state.items.data.unshift({
    username: "user1",
    action: `added ${cardData.content}`,
    last_updated: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  publish(state.cards);
  publish(state.items);

  // TODO: call [BE] POST 'card/' API
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

export function clearTargetCardId() {
  state.targetCardId.data = Number.NEGATIVE_INFINITY;
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