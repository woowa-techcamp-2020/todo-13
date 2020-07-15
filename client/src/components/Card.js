import "./Card.scss";

export default class Card {
  constructor($target, props) {
    this.$target = $target;
    this.content = props.content;

    this.render();
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = this.content;

    console.log(card);

    this.$target.appendChild(card);
  }
}
