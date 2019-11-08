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
    if (this.animatePromise) {
      this.animatePromise.then(() => this.update(value, animationClass));
      return;
    }

    this.before.innerHTML = this.prevValue;
    this.after.innerHTML = value;
    this.prevValue = value;

    if (animationClass) {
      this.animatePromise = this.animate(animationClass);
    }
  }

  animate(animationClass) {
    return new Promise(resolve => {
      this.el.offsetHeight;
      this.el.classList.add(animationClass);

      const callback = () => {
        this.el.classList.remove(animationClass);
        this.after.removeEventListener("animationend", callback);
        this.animatePromise = null;
        resolve();
      };

      this.after.addEventListener("animationend", callback);
    });
  }
}
