import { createElement } from "./Utils";

export default class App {
  constructor(root, defaultValue) {
    this.number = defaultValue;

    this._createUI();
    this._mount(root);
    this._bindEvent();
  }

  _bindEvent() {
    this.plus.addEventListener("click", () => this._increase());
    this.minus.addEventListener("click", () => this._decrease());
  }

  _mount(root) {
    root.appendChild(this.counter);
    this.counter.appendChild(this.plus);
    this.counter.appendChild(this.minus);
    this.counter.appendChild(this.display);
  }

  _createUI() {
    this.counter = createElement("div", "counter");
    this.plus = createElement("button", "plus", "+");
    this.minus = createElement("button", "minus", "-");
    this.display = createElement("div", "number", this.number);
  }

  getNumber() {
    return this.number;
  }
  _decrease() {
    this.display.innerHTML = --this.number;
  }
  _increase() {
    this.display.innerHTML = ++this.number;
  }
}
