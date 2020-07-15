export default class Column {
  constructor($target, props) {
    this.$target = $target;
    this.title = props.title;

    this.render();
  }

  render() {
    const column = document.createElement("div");
    column.innerHTML = this.title;

    console.log(column);

    this.$target.appendChild(column);
  }
}
