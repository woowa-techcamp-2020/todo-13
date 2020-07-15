import "./Header.scss";

export default class Header {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    const header = document.createElement("header");
    header.classList.add("header");
    const title = document.createElement("div");
    title.classList.add("title");
    const menu = document.createElement("div");
    menu.classList.add("menu");
    title.innerHTML = "📝 TODO";
    menu.innerHTML = "menu";
    header.appendChild(title);
    header.appendChild(menu);

    this.$target.appendChild(header);
  }
}
