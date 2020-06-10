import { createElement } from "./Utils";

export default class Display {
  constructor(root, defaultValue) {
    this.el = createElement("div", "number", defaultValue);
    root.appendChild(this.el);
  }

  update(value) {
    this.el.innerHTML = value;
  }
}
