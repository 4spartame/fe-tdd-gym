import { createElement } from "./Utils";

export default class Display {
  constructor(root, defaultValue) {
    this.root = root;
    this.number = defaultValue;
    this._createElements(defaultValue);
  }

  _createElements(defaultValue) {
    this.el = createElement("div", "number");
    this.before = createElement("span", "before");
    this.after = createElement("span", "after", defaultValue);
    this.prevValue = defaultValue;

    this.el.appendChild(this.before);
    this.el.appendChild(this.after);
    this.root.appendChild(this.el);
  }

  update(number) {
    if (this.animatePromise) {
      this.animatePromise.then(() => this.update(number));
      return;
    }

    this.before.innerHTML = this.number;
    this.after.innerHTML = number;
    this._animate(this.number < number);
    this.number = number;
  }

  _animate(increase) {
    const animationClass = increase ? "increase" : "decrease";
    this.el.offsetHeight;
    this.el.classList.add(animationClass);

    this.animatePromise = new Promise(resolve => {
      this.after.addEventListener("animationend", () => {
        this.el.classList.remove(animationClass);
        this.animatePromise = null;
        resolve();
      }, {once: true});
    });
  }
}
