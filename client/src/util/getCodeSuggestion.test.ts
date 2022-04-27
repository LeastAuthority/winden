import { getCodeSuggestion } from "./getCodeSuggestion";

describe("getCodeSuggestion()", () => {
  describe("when the code is empty", () => {
    it("returns null", () => {
      expect(getCodeSuggestion("")).toBe(null);
    });
  });

  describe("when code is on the first word", () => {
    test("returns a suggestion if the word is a substring of a valid code", () => {
      expect(getCodeSuggestion("7-gu")).toBe("guitarist");
    });
    test("returns null if the word is not a substring of any valid code", () => {
      expect(getCodeSuggestion("7-asdf"));
    });
    test("returns null if the substring only matches a word in the second wordlist", () => {
      expect(getCodeSuggestion("7-reveng")).toBe(null);
    });
    test("returns null if the first word is valid and complete", () => {
      expect(getCodeSuggestion("7-guitarist")).toBe(null);
    });
    test("is case insensitive", () => {
      expect(getCodeSuggestion("7-gUiTaR")).toBe("guitarist");
    });
  });

  describe("when code is on the second word", () => {
    test("returns a suggestion if the word is a substring of a valid code", () => {
      expect(getCodeSuggestion("7-guitarist-rev")).toBe("revenge");
    });
    test("returns null if the word is not a substring of any valid code", () => {
      expect(getCodeSuggestion("7-guitarist-asdf"));
    });
    test("returns null if the substring only matches a word in the first wordlist", () => {
      expect(getCodeSuggestion("7-guitarist-guitari")).toBe(null);
    });
    test("returns null if the second word is valid and complete", () => {
      expect(getCodeSuggestion("7-guitarist-revenge")).toBe(null);
    });
    test("is case insensitive", () => {
      expect(getCodeSuggestion("7-guitarist-rEvEnG")).toBe("revenge");
    });
  });

  describe("when there are more that one valid suggestion", () => {
    it("returns null", () => {
      // NOTE: rebirth and revenge are both valid second words
      expect(getCodeSuggestion("7-guitarist-re")).toBe(null);
    });
  });

  test("always return null when code is beyond second word", () => {
    expect(getCodeSuggestion("7-guitarist-revenge-guitaris")).toBe(null);
    expect(getCodeSuggestion("7-guitarist-revenge-reveng")).toBe(null);
  });
});
