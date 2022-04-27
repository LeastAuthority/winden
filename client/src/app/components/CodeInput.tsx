import React, { useRef, useState } from "react";
import { applyCodeSuggestion } from "../../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../../util/constants";
import { getCodeSuggestion } from "../../util/getCodeSuggestion";
import { spellCheckCodeWord } from "../../util/spellCheckCodeWord";
import { CodeErrorType, validateCode } from "../../util/validateCode";
import { Popover } from "./Popover";

type Props = {};

export function CodeInput({}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [code, setCode] = useState("");
  const codeSuggestion = getCodeSuggestion(code);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const hasSpace = e.target.value.includes(" ");
    if (hasSpace && codeSuggestion) {
      setCode(applyCodeSuggestion(e.target.value, codeSuggestion));
    } else if (!hasSpace) {
      setCode(e.target.value);
    }
  }

  const [validationError, setValidationError] = useState<CodeErrorType | null>(
    null
  );

  const errorMessage = (() => {
    const [codeNumber, codeFirstWord, codeSecondWord] = code.split(
      CODE_SEGMENT_DELIMITER
    );
    switch (validationError) {
      case "INVALID_FORMAT":
        return "Please use a code with the number-word-word format.";
      case "INVALID_FIRST_WORD":
        return `First word is not recognized. Did you mean: ${spellCheckCodeWord(
          codeFirstWord,
          "first"
        ).join(", ")}`;
      case "INVALID_SECOND_WORD":
        return `Second word is not recognized. Did you mean: ${spellCheckCodeWord(
          codeSecondWord,
          "second"
        ).join(", ")}`;
    }
  })();

  function validate() {
    setValidationError(validateCode(code));
  }

  return (
    <div data-testid="code-input-container">
      <input
        data-testid="code-input"
        ref={inputRef}
        type="text"
        value={code}
        onChange={handleChange}
        placeholder="Enter code here"
        onBlur={validate}
      />
      <div>{validationError}</div>
      <div data-testid="code-error-message">{errorMessage}</div>
      <Popover elementRef={inputRef} active={!!codeSuggestion}>
        <div>
          <span>{codeSuggestion}</span>
          <span>Press space to complete</span>
        </div>
      </Popover>
    </div>
  );
}
