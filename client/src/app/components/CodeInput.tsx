import { Modifier } from "@popperjs/core";
import classnames from "classnames";
import React, { useRef, useState } from "react";
import { usePopper } from "react-popper";
import { applyCodeSuggestion } from "../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../util/constants";
import { getCodeSuggestion } from "../util/getCodeSuggestion";
import { spellCheckCodeWord } from "../util/spellCheckCodeWord";
import { CodeErrorType, validateCode } from "../util/validateCode";
import Button from "./Button";
import styles from "./CodeInput.module.css";

type Props = {
  onSubmit?: (code: string) => void;
};

const sameWidth: Modifier<string, object> = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      (state.elements.reference as HTMLElement).offsetWidth
    }px`;
  },
};

export function CodeInput(props: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(false);
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
    setFocused(false);
    setValidationError(validateCode(code));
  }

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [sameWidth],
    }
  );

  return (
    <div data-testid="code-input-container" className={styles.container}>
      <div ref={setReferenceElement} className={styles.inputRow}>
        <input
          data-testid="code-input"
          type="text"
          value={code}
          onChange={handleChange}
          placeholder="Enter code here"
          onFocus={() => setFocused(true)}
          onBlur={validate}
        />
        <Button
          className={styles.nextButton}
          onClick={() => props.onSubmit && props.onSubmit(code)}
        >
          Next
        </Button>
      </div>
      <div
        ref={setPopperElement}
        style={popperStyles.popper}
        {...attributes.popper}
        className={classnames(styles.suggestion, {
          [styles.inactive]: !codeSuggestion || !focused,
        })}
      >
        <span>{codeSuggestion}</span>
        <span className={styles.suggestionLabel}>Press space to complete</span>
      </div>
      <div>{validationError}</div>
      <div data-testid="code-error-message" className={styles.errorMessage}>
        {errorMessage}
      </div>
    </div>
  );
}
