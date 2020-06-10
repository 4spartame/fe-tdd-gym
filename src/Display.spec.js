import Display from "./Display";

describe("Display", () => {
  let root;
  let display;
  beforeEach(() => {
    // given
    document.body.innerHTML = `<div class="root"></div>`;
    root = document.querySelector(".root");
    display = new Display(root, 1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("초기화시 루트 엘리먼트에 요소가 삽입되어야 함", () => {
    // given
    const number = root.querySelector(".number");

    // then
    expect(number.querySelector(".before")).toContainHTML("");
    expect(number.querySelector(".after")).toContainHTML("1");
  });

  it("update 호출시 화면의 숫자가 변경되어야 함", async () => {
    // given
    const before = root.querySelector(".before");
    const after = root.querySelector(".after");
    const trigger = {};
    jest
      .spyOn(after, "addEventListener")
      .mockImplementation((evName, callback) => {
        trigger[evName] = callback;
      });

    // when
    display.update(2);
    display.update(3);
    trigger["animationend"]();
    await null;

    // then
    expect(before).toContainHTML("2");
    expect(after).toContainHTML("3");
  });

  it("숫자 증가시 increase 클래스가 설정되어야 함", () => {
    // when
    display.update(2);

    // then
    expect(root.querySelector(".number")).toHaveClass("increase");
  })

  it("숫자 감소시 decrease 클래스가 설정되어야 함", () => {
    // when
    display.update(0);

    // then
    expect(root.querySelector(".number")).toHaveClass("decrease");
  })
});
