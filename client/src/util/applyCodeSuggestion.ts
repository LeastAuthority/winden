import { CODE_SEGMENT_DELIMITER } from "./constants";

// Applies a word suggestion to a partially filled code string.
// example: applyCodeSuggestion("7-guitarist-rev", "revenge") -> "7-guitarist-revenge"
export function applyCodeSuggestion(
  partialCode: string,
  suggestedWord: string
) {
  const parts = partialCode.split(CODE_SEGMENT_DELIMITER);
  const newCode = parts
    .slice(0, -1)
    .concat(suggestedWord)
    .join(CODE_SEGMENT_DELIMITER);
  if (parts.length == 2) {
    return newCode + CODE_SEGMENT_DELIMITER;
  } else {
    return newCode;
  }
}
