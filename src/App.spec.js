import App from "./App";
import userEvent from "@testing-library/user-event";

let root;
beforeEach(() => {
  document.body.innerHTML = `<div class="root"></div>`;
  root = document.querySelector(".root");
});

it("화면에 카운터 UI를 삽입해야 함", () => {
  // when
  App.start(root);

  // then
  const counter = root.querySelector(".counter");
  expect(counter).not.toBeNull();
  expect(counter.querySelector(".plus")).toContainHTML("+");
  expect(counter.querySelector(".minus")).toContainHTML("-");
  expect(counter.querySelector(".number")).toContainHTML("0");
});

describe("버튼 클릭", () => {
  let plus;
  let minus;
  let number;
  beforeEach(() => {
    // given
    App.start(root);
    plus = root.querySelector(".plus");
    minus = root.querySelector(".minus");
    number = root.querySelector(".number");
  });

  it.each([1, 2])("플러스 버튼 %i회 클릭시 값이 증가해야 함", repeat => {
    // when
    for (var i = 0; i < repeat; ++i) {
      userEvent.click(plus);
    }

    // then
    expect(number).toContainHTML(`${repeat}`);
  });

  it.each([1, 2])("마이너스 버튼 %i회 클릭시 값이 감소해야 함", repeat => {
    // when
    for (var i = 0; i < repeat; ++i) {
      userEvent.click(minus);
    }

    // then
    expect(number).toContainHTML(`${0 - repeat}`);
  });
});
