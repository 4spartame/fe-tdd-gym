function increase() {
  document.querySelector(".number").innerHTML = ++this.number;
}

function decrease() {
  document.querySelector(".number").innerHTML = --this.number;
}

export default {
  start(root) {
    root.innerHTML = `<div class="counter"></div>`;
    const counterContainer = root.querySelector(".counter");

    const plus = document.createElement("button");
    const minus = document.createElement("button");
    const number = document.createElement("div");

    counterContainer.appendChild(plus);
    counterContainer.appendChild(minus);
    counterContainer.appendChild(number);

    plus.classList.add("plus");
    plus.innerHTML = "+";
    minus.classList.add("minus");
    minus.innerHTML = "-";
    number.innerHTML = 0;
    this.number = 0;

    number.classList.add(["number"]);

    plus.addEventListener("click", increase.bind(this));
    minus.addEventListener("click", decrease.bind(this));
  }
};
