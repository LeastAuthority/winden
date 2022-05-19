import { validateCode } from "./validateCode";

describe("validateCode()", () => {
  it("returns INVALID_FORMAT when code does not follow number-word-word format", () => {
    expect(validateCode("asdf")).toBe("INVALID_FORMAT");
    expect(validateCode("7-guitarist")).toBe("INVALID_FORMAT");

    expect(validateCode("guitarist-7-revenge")).toBe("INVALID_FORMAT");
    expect(validateCode("guitarist-revenge-7")).toBe("INVALID_FORMAT");

    expect(validateCode("7--")).toBe("INVALID_FORMAT");
    expect(validateCode("-guitarist-")).toBe("INVALID_FORMAT");
    expect(validateCode("--revenge")).toBe("INVALID_FORMAT");

    expect(validateCode("7-guitarist-")).toBe("INVALID_FORMAT");
    expect(validateCode("7--revenge")).toBe("INVALID_FORMAT");
    expect(validateCode("-guitarist-revenge")).toBe("INVALID_FORMAT");

    expect(validateCode("7-guitarist-revenge-extra")).toBe("INVALID_FORMAT");
  });

  test("returns INVALID_FIRST_WORD when code follows format but the first word is invalid", () => {
    expect(validateCode("7-asdf-revenge")).toBe("INVALID_FIRST_WORD");
  });

  test("returns INVALID_SECOND_WORD when code follows format but second word is invalid", () => {
    expect(validateCode("7-guitarist-asdf")).toBe("INVALID_SECOND_WORD");
  });

  test("returns INVALID_FIRST_WORD when code follows format but both words are invalid", () => {
    expect(validateCode("7-asdf-asdf")).toBe("INVALID_FIRST_WORD");
  });
});
