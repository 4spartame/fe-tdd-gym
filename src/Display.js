import { createElement } from "./Utils";

export default class Display {
  constructor(defaultValue) {
    this.el = createElement("div", "number");
    this.before = createElement("span", "before");
    this.after = createElement("span", "after", defaultValue);
    this.prevValue = defaultValue;
  }

  mount(root) {
    this.el.appendChild(this.before);
    this.el.appendChild(this.after);
    root.appendChild(this.el);
  }

  update(value, animationClass) {
    this.before.innerHTML = this.prevValue;
    this.after.innerHTML = value;
    this.prevValue = value;
    this.animate(animationClass);
  }

  animate(animationClass) {
    this.el.classList.add(animationClass);

    const callback = () => {
      this.el.classList.remove(animationClass);
      this.el.removeEventListener("animationend", callback);
    };

    this.el.addEventListener("animationend", callback);
  }
}
