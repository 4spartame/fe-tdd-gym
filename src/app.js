export default {
  start(root) {
    root.innerHTML = `<div class="counterContainer"></div>`;
    const counterContainer = root.querySelector(".counterContainer");

    const plus = document.createElement("button");
    const minus = document.createElement("button");
    const counter = document.createElement("div");

    counterContainer.appendChild(plus);
    counterContainer.appendChild(minus);
    counterContainer.appendChild(counter);

    plus.classList.add("counterButton", "plus");
    plus.innerText = "+";
    minus.classList.add("counterButton", "minus");
    minus.innerText = "-";
    counter.innerText = 0;
    this.number = 0;

    counter.classList.add(["counter"]);

    plus.addEventListener("click", this.increase.bind(this));
    minus.addEventListener("click", this.decrease.bind(this));
  },

  increase() {
    this.number = ++this.number;
    document.querySelector(".counter").innerText = this.number;
  },

  decrease() {
    this.number = --this.number;
    document.querySelector(".counter").innerText = this.number;
  }
};
