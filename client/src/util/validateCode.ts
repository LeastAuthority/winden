import { CODE_SEGMENT_DELIMITER } from "./constants";
import { firstWordList, secondWordList } from "./wordList";

export type CodeErrorType =
  | "INVALID_FORMAT"
  | "INVALID_FIRST_WORD"
  | "INVALID_SECOND_WORD";

export function validateCode(code: string): CodeErrorType | null {
  // if code does not follow number-word-word format
  if (!/^\d+-\w+-\w+$/.test(code)) {
    return "INVALID_FORMAT";
  }
  const [number, firstWord, secondWord] = code.split(CODE_SEGMENT_DELIMITER);
  // code is formatted but the first word is not in list
  if (!firstWordList.includes(firstWord)) {
    return "INVALID_FIRST_WORD";
  }
  // code is formatted but the second word is not in list
  if (!secondWordList.includes(secondWord)) {
    return "INVALID_SECOND_WORD";
  }
  // no errors
  return null;
}
