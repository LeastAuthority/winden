import { applyCodeSuggestion } from "./applyCodeSuggestion";

describe("applyCodeSuggestion()", () => {
  describe("when applying the first word", () => {
    it("applies the suggested word as well as a delimiter to prepare for the second word", () => {
      expect(applyCodeSuggestion("7-gu", "guitarist")).toBe("7-guitarist-");
    });
  });

  describe("when applying the second word", () => {
    it("applies the suggested word", () => {
      expect(applyCodeSuggestion("7-guitarist-rev", "revenge")).toBe(
        "7-guitarist-revenge"
      );
    });
  });
});
