export const state = {
    items: {
        data: [],
        listeners: {},
    },
    isSidebarVisible: {
        data: false,
        listeners: {},
    }
};

export const subscribe = (component, name, action) => {
    state[name].listeners[component] = action;
}

const publish = (data) =>
    Object.values(data.listeners)
    .forEach(action => action(data.data));

export function getIsSidebarVisible() {
    return state.isSidebarVisible.data;
}
