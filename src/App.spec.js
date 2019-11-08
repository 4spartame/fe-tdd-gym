import App from "./App";
import userEvent from "@testing-library/user-event";

let root;
beforeEach(() => {
  // given
  document.body.innerHTML = `<div class="root"></div>`;
  root = document.querySelector(".root");
});

it("초기화시 루트 엘리먼트에 UI 엘리먼트를 삽입해야 함", () => {
  // when
  new App(root, 0);

  // then
  const counter = root.querySelector(".counter");
  expect(counter).not.toBeNull();
  expect(counter.querySelector(".plus")).toContainHTML("+");
  expect(counter.querySelector(".minus")).toContainHTML("-");
  expect(counter.querySelector(".number")).toContainHTML("0");
});

it("getNumber 메서드 호출시 현재 숫자를 반환해야 함", () => {
  // given
  const app = new App(root, 1);

  // when
  const number = app.getNumber();

  // then
  expect(number).toBe(1);
});

it.each([[1, 0], [2, 1]])(
  "플러스 버튼 %i회 클릭시 값이 증가해야 함(9 -> %i)",
  (repeat, expected) => {
    // given
    const app = new App(root, 9);
    const plus = root.querySelector(".plus");

    // when
    for (var i = 0; i < repeat; ++i) {
      userEvent.click(plus);
    }

    // then
    expect(app.getNumber()).toBe(expected);
  }
);

it.each([[1, 9], [2, 8]])(
  "마이너스 버튼 %i회 클릭시 값이 감소해야 함(0 -> %i)",
  (repeat, expected) => {
    // given
    const app = new App(root, 0);
    const minus = root.querySelector(".minus");

    // when
    for (var i = 0; i < repeat; ++i) {
      userEvent.click(minus);
    }

    // then
    expect(app.getNumber()).toBe(expected);
  }
);
