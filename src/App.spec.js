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

it.each([1, 2])("플러스 버튼 %i회 클릭시 값이 증가해야 함", repeat => {
  // given
  const app = new App(root, 0);
  const plus = root.querySelector(".plus");

  // when
  for (var i = 0; i < repeat; ++i) {
    userEvent.click(plus);
  }

  // then
  expect(app.getNumber()).toBe(repeat);
});

it.each([1, 2])("마이너스 버튼 %i회 클릭시 값이 감소해야 함", repeat => {
  // given
  const app = new App(root, 9);
  const minus = root.querySelector(".minus");

  // when
  for (var i = 0; i < repeat; ++i) {
    userEvent.click(minus);
  }

  // then
  expect(app.getNumber()).toBe(9 - repeat);
});

it("값이 9일때 플러스 버튼 클릭시 0이 되어야 함", () => {
  // given
  const app = new App(root, 9);
  const plus = root.querySelector(".plus");

  // when
  userEvent.click(plus);

  // then
  expect(app.getNumber()).toBe(0);
});

it("값이 0일때 마이너스 버튼 클릭시 9가 되어야 함", () => {
  // given
  const app = new App(root, 0);
  const minus = root.querySelector(".minus");

  // when
  userEvent.click(minus);

  // then
  expect(app.getNumber()).toBe(9);
});
