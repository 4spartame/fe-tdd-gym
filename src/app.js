import { createElement } from "./Utils";

export default class App {
  constructor(root, defaultValue) {
    this.number = defaultValue;
    this.root = root;

    this._createElements();
    this._bindEvent();
  }

  _bindEvent() {
    this.plus.addEventListener("click", () => this._increase());
    this.minus.addEventListener("click", () => this._decrease());
  }
  
  _createElements() {
    this.counter = createElement("div", "counter");
    this.plus = createElement("button", "plus", "+");
    this.minus = createElement("button", "minus", "-");
    this.display = createElement("div", "number", this.number);
    this.counter.appendChild(this.plus);
    this.counter.appendChild(this.minus);
    this.counter.appendChild(this.display);
    this.root.appendChild(this.counter);
  }

  getNumber() {
    return this.number;
  }

  _decrease() {
    let next = this.number - 1;
    next = next < 0 ? 9 : next;

    this.display.innerHTML = next;
    this.number = next;
  }

  _increase() {
    let next = this.number + 1;
    next = next > 9 ? 0 : next;

    this.display.innerHTML = next;
    this.number = next;
  }
}
