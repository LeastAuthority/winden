import { Button, Group, Paper, Space, Text, TextInput } from "@mantine/core";
import { Modifier } from "@popperjs/core";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { useCodeInput } from "../hooks/useCodeInput";
import { useStyles } from "../hooks/useStyles";
import { applyCodeSuggestion } from "../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../util/constants";
import { getCodeSuggestion } from "../util/getCodeSuggestion";
import { spellCheckCodeWord } from "../util/spellCheckCodeWord";
import { validateCode } from "../util/validateCode";

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
  submitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit?: (code: string) => void;
};

export function CodeInputContent(props: ContentProps) {
  const { classes } = useStyles();
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
  const error = validateCode(props.code);

  const errorMessage = (() => {
    if (!props.touched || props.focused) {
      return "";
    }
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
    <div data-testid="code-input-container">
      <Group position="center" spacing="md">
        <TextInput
          ref={setReferenceElement}
          style={{ flex: 1, maxWidth: 400 }}
          data-testid="code-input"
          type="text"
          value={props.code}
          onChange={props.onChange}
          placeholder="Enter code here (E.g.: 7-guitarist-revenge)"
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          error={Boolean(errorMessage)}
          disabled={props.submitting}
        />
        <Button
          onClick={() => !error && props.onSubmit && props.onSubmit(props.code)}
          loading={props.submitting}
          sx={(theme) => ({
            // TODO: shades are needed for hover events
            backgroundColor: theme.other.colors.yellow,
            color: theme.other.colors.black,
            "&:hover": {
              backgroundColor: theme.fn.darken(theme.other.colors.yellow, 0.1),
            },
          })}
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
      {/* // TODO: red shade override */}
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

export function CodeInput(props: Props) {
  const [focused, setFocused] = useState(false);
  const codeInput = useCodeInput();
  const codeSuggestion = getCodeSuggestion(codeInput?.value || "");
  const [touched, setTouched] = useState(false);

  return (
    <CodeInputContent
      code={codeInput?.value || ""}
      codeSuggestion={codeSuggestion}
      focused={focused}
      touched={touched}
      submitting={props.submitting || false}
      onChange={(e) => {
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
        setFocused(true);
        setTouched(true);
      }}
      onBlur={() => setFocused(false)}
      onSubmit={props.onSubmit}
    />
  );
}
