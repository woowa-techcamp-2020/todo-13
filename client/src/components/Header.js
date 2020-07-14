export default class Header {
  constructor($target) {
    this.$target = $target;

    const header = document.createElement("header");
    header.classList.add("header");
    header.innerHTML = "Header";

    this.$target.appendChild(header);
  }

  render() {}
}
