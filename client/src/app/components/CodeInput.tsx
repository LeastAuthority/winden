import { Button, Group, Paper, Space, Text, TextInput } from "@mantine/core";
import { Modifier } from "@popperjs/core";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { useCodeInput } from "../hooks/useCodeInput";
import { useCommonStyles } from "../hooks/useCommonStyles";
import { applyCodeSuggestion } from "../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../util/constants";
import { getCodeSuggestion } from "../util/getCodeSuggestion";
import { spellCheckCodeWord } from "../util/spellCheckCodeWord";
import { CodeErrorType, validateCode } from "../util/validateCode";

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
  touched: boolean;
  showError: boolean;
  submitting: boolean;
  errorType: CodeErrorType | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit?: (code: string) => void;
};

export function CodeInputContent(props: ContentProps) {
  const { classes } = useCommonStyles();
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
    if (!props.touched || !props.showError) {
      return "";
    }
    const [_codeNumber, codeFirstWord, codeSecondWord] = props.code.split(
      CODE_SEGMENT_DELIMITER
    );
    switch (props.errorType) {
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
    <div data-testid="code-input-container">
      <Group position="center" spacing="md">
        <TextInput
          ref={setReferenceElement}
          style={{
            flexGrow: 1,
            maxWidth: 400,
          }}
          sx={(theme) => ({
            input: {
              textAlign: "center",
            },
          })}
          data-testid="code-input"
          type="text"
          value={props.code}
          onChange={props.onChange}
          placeholder="Enter code here (E.g.: 7-guitarist-revenge)"
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          error={Boolean(errorMessage)}
          disabled={props.submitting}
          onKeyDown={(e) => {
            if (e.key === "Enter" && props.onSubmit) {
              props.onSubmit(props.code);
            }
          }}
        />
        <Button
          data-testid="code-input-submit"
          onClick={() => {
            if (props.onSubmit) {
              props.onSubmit(props.code);
            }
          }}
          loading={props.submitting}
          className={classes.primary}
        >
          Next
        </Button>
      </Group>
      <div
        ref={setPopperElement}
        style={{
          ...popperStyles.popper,
          visibility:
            props.codeSuggestion && props.focused ? "visible" : "hidden",
          opacity: props.codeSuggestion && props.focused ? 1 : 0,
          transition: "opacity ease-in 0.2s",
          zIndex: 9001,
        }}
        {...attributes.popper}
      >
        <Space h="sm" />
        <Paper p="xs" withBorder>
          <Group spacing="md" position="center">
            <Text inline className={classes.darkGrey}>
              {props.codeSuggestion}
            </Text>
            <Paper p="xs" withBorder>
              <Text className={classes.darkGrey}>Press space to complete</Text>
            </Paper>
          </Group>
        </Paper>
      </div>
      <Text
        data-testid="code-error-message"
        sx={(theme) => ({
          color: theme.other.colors["warning-red"],
        })}
        align="center"
        size="sm"
        weight={300}
      >
        <Space h="sm" />
        {errorMessage || <>&#8203;</>}
      </Text>
    </div>
  );
}

type Props = {
  onSubmit?: (code: string) => void;
  submitting?: boolean;
};

export default function CodeInput(props: Props) {
  const [focused, setFocused] = useState(false);
  const codeInput = useCodeInput();
  const codeSuggestion = getCodeSuggestion(codeInput?.value || "");
  const [touched, setTouched] = useState(false);
  const [showError, setShowError] = useState(false);

  const code = codeInput?.value || "";
  const error = validateCode(code);

  return (
    <CodeInputContent
      code={code}
      codeSuggestion={codeSuggestion}
      focused={focused}
      touched={touched}
      showError={showError}
      errorType={error}
      submitting={props.submitting || false}
      onChange={(e) => {
        setShowError(false);
        const hasSpace = e.target.value.includes(" ");
        if (hasSpace && codeSuggestion) {
          codeInput?.setValue(
            applyCodeSuggestion(e.target.value, codeSuggestion)
          );
        } else if (!hasSpace) {
          codeInput?.setValue(e.target.value);
        }
      }}
      onFocus={() => {
        setShowError(false);
        setFocused(true);
        setTouched(true);
      }}
      onBlur={() => {
        setShowError(true);
        setFocused(false);
      }}
      onSubmit={() => {
        setShowError(true);
        if (!error && props.onSubmit) {
          props.onSubmit(code);
        }
      }}
    />
  );
}
