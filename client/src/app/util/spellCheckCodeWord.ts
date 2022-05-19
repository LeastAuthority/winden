import { distance } from "fastest-levenshtein";
import {
  SPELL_CHECK_MAX_EDIT_DISTANCE,
  SPELL_CHECK_MAX_SUGGESTIONS,
} from "./constants";
import { firstWordList, secondWordList } from "./wordList";

export function spellCheckCodeWord(
  word: string,
  wordListType: "first" | "second"
) {
  const wordList = wordListType === "first" ? firstWordList : secondWordList;
  const suggestions: [number, string][] = [];
  for (let i = 0; i < wordList.length; i++) {
    const suggestedWord = wordList[i];
    const editDistance = distance(word, suggestedWord);
    if (editDistance <= SPELL_CHECK_MAX_EDIT_DISTANCE) {
      suggestions.push([editDistance, suggestedWord]);
    }
  }
  return suggestions
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1])
    .slice(0, SPELL_CHECK_MAX_SUGGESTIONS);
}
