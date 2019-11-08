import Display from "./Display";

describe("Display", () => {
  let root;
  let display;
  beforeEach(() => {
    // given
    document.body.innerHTML = `<div class="root"></div>`;
    root = document.querySelector(".root");
    display = new Display(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("mount 호출시 루트 엘리먼트에 .number 요소가 삽입되어야 함", () => {
    // when
    display.mount(root);

    // then
    expect(root.querySelector(".number")).not.toBeNull();
  });

  it(".number 요소 하위에 .before, .after가 삽입되어야 함", () => {
    // given
    display.mount(root);
    const number = root.querySelector(".number");

    // then
    expect(number.querySelector(".before")).toContainHTML("");
    expect(number.querySelector(".after")).toContainHTML("0");
  });

  it("update 호출시 화면의 숫자가 변경되어야 함", () => {
    // given
    display.mount(root);

    // when
    display.update(1);

    // then
    expect(root.querySelector(".number")).toContainHTML("1");
  });

  it("update 호출시 변경된 숫자가 .after에 삽입되어야 함", () => {
    // given
    display.mount(root);

    // when
    display.update(1);

    // then
    expect(root.querySelector(".after")).toContainHTML("1");
  });

  it("update 호출시 이전 숫자가 .before에 삽입되어야 함", () => {
    // given
    display.mount(root);
    display.update(1);

    // when
    display.update(2);

    // then
    expect(root.querySelector(".before")).toContainHTML("1");
  });

  it("update 호출시 애니메이션 클래스를 .number에 삽입해야 함", () => {
    // given
    display.mount(root);

    // when
    display.update(1, "increase");

    // then
    expect(root.querySelector(".number")).toHaveClass("increase");
  });

  describe("애니메이션", () => {
    let trigger;
    let after;
    beforeEach(() => {
      // given
      display.mount(root);
      trigger = {};
      after = root.querySelector(".after");
      jest
        .spyOn(after, "addEventListener")
        .mockImplementation((evName, callback) => {
          trigger[evName] = callback;
        });
    });

    it("애니메이션 완료 이벤트 발생시 애니메이션 클래스를 .number에서 제거해야 함", () => {
      // given
      display.update(1, "increase");

      // when
      trigger["animationend"]();

      // then
      expect(root.querySelector(".number")).not.toHaveClass("increase");
    });

    it("애니메이션 완료 이벤트 발생시 애니메이션 완료 콜백을 제거해야 함", () => {
      // given
      jest
        .spyOn(after, "removeEventListener")
        .mockImplementation((evName, callback) => {
          if (trigger[evName] === callback) {
            trigger[evName] = "removed";
          }
        });
      display.update(1, "increase");

      // when
      trigger["animationend"]();

      // then
      expect(trigger["animationend"]).toBe("removed");
    });

    it("update 반복 호출시 이전 애니메이션 종료 후 다음 애니메이션 실행되어야 함", async () => {
      // given
      display.update(1, "increase");
      display.update(0, "decrease");

      // when
      trigger["animationend"]();
      await null;

      // then
      expect(root.querySelector(".before")).toContainHTML("1");
      expect(root.querySelector(".after")).toContainHTML("0");
      expect(root.querySelector(".number")).toHaveClass("decrease");
    });
  });
});
