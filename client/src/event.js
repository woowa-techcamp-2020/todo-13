import { showModal } from "./utils/util";

export function init() {
    const dashboard = document.querySelector(".dashboard");
    dashboard.addEventListener('click', onCardDeleteBtnClick)
}

function onCardDeleteBtnClick(e) {
    if (e.target.classList.contains("card-delete")) {
        const $card = e.target.closest(".card");
        const cardText = $card.querySelector(".card-text").innerText;
        console.dir(cardText);

        // showModal(cardText, "note", cardText);
    }
}