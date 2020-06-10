import { createElement } from "./Utils";
import Display from "./Display";

export default class App {
  constructor(root, defaultValue) {
    this.number = defaultValue;
    this.root = root;

    this._createElements();
    this._initDisplay();
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
    this.counter.appendChild(this.plus);
    this.counter.appendChild(this.minus);
    this.root.appendChild(this.counter);
  }

  _initDisplay() {
    this.display = new Display(this.root, this.number);
  }

  getNumber() {
    return this.number;
  }

  _decrease() {
    let next = this.number - 1;
    next = next < 0 ? 9 : next;

    this._updateNumber(next);
  }

  _increase() {
    let next = this.number + 1;
    next = next > 9 ? 0 : next;
    
    this._updateNumber(next);
  }

  _updateNumber(next) {
    this.number = next;
    this.display.update(this.number);
  }
}