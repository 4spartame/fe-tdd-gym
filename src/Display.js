import { createElement } from "./Utils";

export default class Display {
  constructor(defaultValue) {
    this.el = createElement("div", "number", defaultValue);
  }

  mount(root) {
    root.appendChild(this.el);
  }

  update(value) {
    this.el.innerHTML = value;
  }
}
