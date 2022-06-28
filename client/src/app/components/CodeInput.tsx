import { Button, Group, Paper, Space, Text, TextInput } from "@mantine/core";
import { Modifier } from "@popperjs/core";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { applyCodeSuggestion } from "../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../util/constants";
import { getCodeSuggestion } from "../util/getCodeSuggestion";
import { spellCheckCodeWord } from "../util/spellCheckCodeWord";
import { validateCode } from "../util/validateCode";

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
  touched: boolean;
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
      <Group align="stretch" ref={setReferenceElement} spacing="md">
        <TextInput
          style={{ flex: 1 }}
          data-testid="code-input"
          type="text"
          value={props.code}
          onChange={props.onChange}
          placeholder="Enter code here (E.g.: 7-guitarist-revenge)"
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          error={Boolean(errorMessage)}
        />
        <Button
          onClick={() => !error && props.onSubmit && props.onSubmit(props.code)}
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
        }}
        {...attributes.popper}
      >
        <Space h="sm" />
        <Paper shadow="md" p="xs">
          <Group spacing="md" position="center">
            <Text inline>{props.codeSuggestion}</Text>
            <Paper shadow="xs" p="xs">
              <Text>Press space to complete</Text>
            </Paper>
          </Group>
        </Paper>
      </div>
      <Text data-testid="code-error-message" color="red">
        {errorMessage}
      </Text>
    </div>
  );
}

export function CodeInput(props: Props) {
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(false);
  const codeSuggestion = getCodeSuggestion(code);
  const [touched, setTouched] = useState(false);

  return (
    <CodeInputContent
      code={code}
      codeSuggestion={codeSuggestion}
      focused={focused}
      touched={touched}
      onChange={(e) => {
        const hasSpace = e.target.value.includes(" ");
        if (hasSpace && codeSuggestion) {
          setCode(applyCodeSuggestion(e.target.value, codeSuggestion));
        } else if (!hasSpace) {
          setCode(e.target.value);
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
