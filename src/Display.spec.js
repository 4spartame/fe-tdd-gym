import Display from "./Display";

describe("Display", () => {
  let root;
  let display;
  beforeEach(() => {
    // given
    document.body.innerHTML = `<div class="root"></div>`;
    root = document.querySelector(".root");
    display = new Display(root, 0);
  });

  it("초기화시 루트 엘리먼트에 .number 요소가 삽입되어야 함", () => {
    // then
    expect(root.querySelector(".number")).toContainHTML("0");
  });

  it("update 호출시 화면의 숫자가 변경되어야 함", () => {
    // when
    display.update(1);

    // then
    expect(root.querySelector(".number")).toContainHTML("1");
  });
});
