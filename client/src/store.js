import * as Data from "./Data";

export const state = {
    items: {
        data: [],
        listeners: {},
    },
    isSidebarVisible: {
        data: false,
        listeners: {},
    },
    cards: {
        data: [],
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
    console.log(state.cards.data);
    publish(state.cards);
}

export function getCards() {
    return state.cards.data;
}
