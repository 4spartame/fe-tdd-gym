function increase() {
  document.querySelector(".counter").innerHTML = ++this.number;
}

function decrease() {
  document.querySelector(".counter").innerHTML = --this.number;
}

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
    plus.innerHTML = "+";
    minus.classList.add("counterButton", "minus");
    minus.innerHTML = "-";
    counter.innerHTML = 0;
    this.number = 0;

    counter.classList.add(["counter"]);

    plus.addEventListener("click", increase.bind(this));
    minus.addEventListener("click", decrease.bind(this));
  }
};
