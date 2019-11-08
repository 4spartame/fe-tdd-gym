import { createElement } from "./Utils";
import Display from "./Display";

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
    this.display.mount(this.counter);
  }

  _createUI() {
    this.counter = createElement("div", "counter");
    this.plus = createElement("button", "plus", "+");
    this.minus = createElement("button", "minus", "-");
    this.display = new Display(this.number);
  }

  getNumber() {
    return this.number;
  }

  _decrease() {
    let next = this.number - 1;
    next = next < 0 ? 9 : next;

    this.number = next;
    this.display.update(this.number);
  }

  _increase() {
    let next = this.number + 1;
    next = next > 9 ? 0 : next;

    this.number = next;
    this.display.update(this.number);
  }
}
