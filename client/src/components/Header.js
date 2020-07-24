import "./Header.scss";
import { bindEvent } from "../utils/util";
import {
  subscribe,
  fetchItems,
  toggleSidebar,
  getUserAuth,
  setUserAuth,
  setUsername,
  getUsername,
} from "../store";

export default function Header(props) {
  const componentName = "header";

  function onMenuClick(e) {
    fetchItems();
    toggleSidebar("active");
    e.stopPropagation();
  }

  function onAdminLoginClick(e) {
    // TODO: remove hard coded parameter
    setUsername("Friday");
    setUserAuth("admin");
  }

  function onUserLoginClick(e) {
    // TODO: remove hard coded parameter
    setUsername("Stark");
    setUserAuth("user");
  }

  function onLogOutBtnClick(e) {
    // TODO: remove hard coded parameter
    setUsername("");
    setUserAuth("guest");
  }

  function render() {
    const auth = getUserAuth();
    const username = getUsername();

    const html = `
    <div class="header-title">📝 TODO</div>
      <div class="header-btn-wrapper">
      ${
        auth === "guest"
          ? `<button class="header-admin-login-btn"> log in as Admin </button>
          <button class="header-user-login-btn"> log in as User </button>`
          : `<h1 class="header-greeting">${username}</h1>
          <button class="header-logout-btn"> log out </button>`
      }
      </div>
      <div class="header-menu">
        <ion-icon name="menu-outline"></ion-icon>
        <p class='header-text'>MENU</p>
      </div>
    </div>
    `;

    const $header = document.querySelector(".header");
    $header.innerHTML = html;

    bindEvent(".header-menu", "click", onMenuClick);
    bindEvent(".header-admin-login-btn", "click", onAdminLoginClick);
    bindEvent(".header-user-login-btn", "click", onUserLoginClick);
    bindEvent(".header-logout-btn", "click", onLogOutBtnClick);
  }

  fetchItems();
  subscribe(componentName, "userAuth", render);
  setTimeout(render, 0);

  return `<header class=${componentName}></header>`;
}
