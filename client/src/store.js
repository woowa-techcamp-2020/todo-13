import * as Data from "./Data";

export const state = {
    cards: {
        data: [],
        listeners: {},
    },
    items: {
        data: [],
        listeners: {},
    },
    popupMessage: {
        data: '',
        listeners: {},
    },
    isSidebarVisible: {
        data: false,
        listeners: {},
    },
    isPopupVisible: {
        data: false,
        listeners: {},
    }
};

export const subscribe = (component, key, eventHandler) => {
    state[key].listeners[component] = eventHandler;
}

const publish = (data) =>
    Object.values(data.listeners)
    .forEach(eventHandler => eventHandler(data.data));

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
