import {
  CODE_SEGMENT_DELIMITER,
  CODE_SEGMENT_FIRST_WORD_INDEX,
  CODE_SEGMENT_LENGTH,
} from "./constants";
import wordList from "./wordList";

const pairs = Object.values(wordList);
const firstWordList = pairs.map((x) => x[1].toLocaleLowerCase());
const secondWordList = pairs.map((x) => x[0].toLocaleLowerCase());

export function getCodeSuggestion(partialCode: string) {
  const codeSegments = partialCode
    .toLocaleLowerCase()
    .split(CODE_SEGMENT_DELIMITER);
  if (codeSegments.length > CODE_SEGMENT_LENGTH) {
    return null;
  }
  const wordList =
    codeSegments.length === CODE_SEGMENT_FIRST_WORD_INDEX
      ? firstWordList
      : secondWordList;
  const partialWord = codeSegments[codeSegments.length - 1];
  const closestWordIndex = wordList.findIndex((x) => x >= partialWord);
  if (
    // don't provide a suggestion if under the following conditions:
    // - partial code does not match the closest word
    !wordList[closestWordIndex]?.includes(partialWord) ||
    // - code is already completed
    wordList[closestWordIndex] === partialWord ||
    // -there are more than one matching option
    wordList[closestWordIndex + 1]?.includes(partialWord)
  ) {
    return null;
  } else {
    return wordList[closestWordIndex];
  }
}
