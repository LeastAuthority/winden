import { Modifier } from "@popperjs/core";
import classnames from "classnames";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { applyCodeSuggestion } from "../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../util/constants";
import { getCodeSuggestion } from "../util/getCodeSuggestion";
import { spellCheckCodeWord } from "../util/spellCheckCodeWord";
import { validateCode } from "../util/validateCode";
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

type ContentProps = {
  code: string;
  codeSuggestion: string | null;
  focused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit?: (code: string) => void;
};

export function CodeInputContent(props: ContentProps) {
  // refs technically not pure
  const [referenceElement, setReferenceElement] =
    useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [sameWidth],
    }
  );

  const errorMessage = (() => {
    if (props.focused) {
      return "";
    }
    const error = validateCode(props.code);
    const [_codeNumber, codeFirstWord, codeSecondWord] = props.code.split(
      CODE_SEGMENT_DELIMITER
    );
    switch (error) {
      case null:
        return "";
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

  return (
    <div data-testid="code-input-container" className={styles.container}>
      <div ref={setReferenceElement} className={styles.inputRow}>
        <input
          data-testid="code-input"
          type="text"
          value={props.code}
          onChange={props.onChange}
          placeholder="Enter code here"
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        <Button
          className={styles.nextButton}
          onClick={() => props.onSubmit && props.onSubmit(props.code)}
        >
          Next
        </Button>
      </div>
      <div
        ref={setPopperElement}
        style={popperStyles.popper}
        {...attributes.popper}
        className={classnames(styles.suggestion, {
          [styles.inactive]: !props.codeSuggestion || !props.focused,
        })}
      >
        <span>{props.codeSuggestion}</span>
        <span className={styles.suggestionLabel}>Press space to complete</span>
      </div>
      <div data-testid="code-error-message" className={styles.errorMessage}>
        {errorMessage}
      </div>
    </div>
  );
}

export function CodeInput(props: Props) {
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(false);
  const codeSuggestion = getCodeSuggestion(code);

  return (
    <CodeInputContent
      code={code}
      codeSuggestion={codeSuggestion}
      focused={focused}
      onChange={(e) => {
        const hasSpace = e.target.value.includes(" ");
        if (hasSpace && codeSuggestion) {
          setCode(applyCodeSuggestion(e.target.value, codeSuggestion));
        } else if (!hasSpace) {
          setCode(e.target.value);
        }
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onSubmit={props.onSubmit}
    />
  );
}
