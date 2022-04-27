import { spellCheckCodeWord } from "./spellCheckCodeWord";

describe("spellCheckCodeWord()", () => {
  test("first word list", () => {
    expect(spellCheckCodeWord("gitarist", "first")[0]).toBe("guitarist");
    expect(spellCheckCodeWord("revege", "first")[0]).toBe("revenue");
  });
  test("first word list", () => {
    expect(spellCheckCodeWord("gitarist", "second")[0]).toBe("artist");
    expect(spellCheckCodeWord("revege", "second")[0]).toBe("revenge");
  });
});
