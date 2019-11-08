export default class App {
  constructor(root, defaultValue) {
    this.number = defaultValue;

    this.counter = document.createElement("div");
    this.counter.classList.add("counter");
    root.appendChild(this.counter);

    this.plus = document.createElement("button");
    this.plus.classList.add("plus");
    this.plus.innerHTML = "+";
    this.counter.appendChild(this.plus);

    this.minus = document.createElement("button");
    this.minus.classList.add("minus");
    this.minus.innerHTML = "-";
    this.counter.appendChild(this.minus);

    this.display = document.createElement("div");
    this.display.classList.add("number");
    this.display.innerHTML = this.number;
    this.counter.appendChild(this.display);

    this.plus.addEventListener("click", () => this._increase());
    this.minus.addEventListener("click", () => this._decrease());
  }
  _decrease() {
    this.display.innerHTML = --this.number;
  }
  _increase() {
    this.display.innerHTML = ++this.number;
  }
}
