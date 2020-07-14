export default class Dashboard {
  constructor($target) {
    this.$target = $target;

    const dashboard = document.createElement("div");
    dashboard.classList.add("Dashboard");
    dashboard.innerHTML = "Dashboard";

    this.$target.appendChild(dashboard);
  }
}
