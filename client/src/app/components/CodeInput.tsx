import {
  Button,
  Group,
  Paper,
  Popover,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useCodeInput } from "../hooks/useCodeInput";
import { applyCodeSuggestion } from "../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../util/constants";
import { getCodeSuggestion } from "../util/getCodeSuggestion";
import { spellCheckCodeWord } from "../util/spellCheckCodeWord";
import { CodeErrorType, validateCode } from "../util/validateCode";

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

  const popoverOpened = Boolean(props.codeSuggestion && props.focused);

  return (
    <div data-testid="code-input-container">
      <Group position="center" spacing="md">
        <Popover
          opened={popoverOpened}
          position="bottom"
          width="target"
          transition="pop"
        >
          <Popover.Target>
            <TextInput
              style={{
                flexGrow: 1,
                maxWidth: 400,
              }}
              sx={(theme) => ({
                input: {
                  textAlign: "center",
                  fontSize: 14.4,
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
                if (
                  e.key === "Enter" &&
                  props.onSubmit &&
                  !Boolean(props.errorType)
                ) {
                  props.onSubmit(props.code);
                }
              }}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Group spacing="md" position="center">
              <Text inline>{props.codeSuggestion}</Text>
              <Paper p="xs" withBorder>
                <Text>Press space to complete</Text>
              </Paper>
            </Group>
          </Popover.Dropdown>
        </Popover>
        <Button
          data-testid="code-input-submit"
          onClick={() => {
            if (props.onSubmit) {
              props.onSubmit(props.code);
            }
          }}
          disabled={Boolean(props.errorType)}
          loading={props.submitting}
          color="yellow"
        >
          Next
        </Button>
      </Group>
      <Text
        data-testid="code-error-message"
        sx={(theme) => ({
          color: theme.colors["warning-red"][6],
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

  const code = codeInput?.value || "";
  const error = validateCode(code);

  useEffect(() => {
    return () => {
      codeInput?.setTouched(false);
      codeInput?.setShowError(false);
    };
  }, []);

  return (
    <CodeInputContent
      code={code}
      codeSuggestion={codeSuggestion}
      focused={focused}
      touched={codeInput?.touched || false}
      showError={codeInput?.showError || false}
      errorType={error}
      submitting={props.submitting || false}
      onChange={(e) => {
        codeInput?.setShowError(false);
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
        codeInput?.setShowError(false);
        setFocused(true);
        codeInput?.setTouched(true);
      }}
      onBlur={() => {
        codeInput?.setShowError(true);
        setFocused(false);
      }}
      onSubmit={() => {
        codeInput?.setShowError(true);
        if (!error && props.onSubmit) {
          props.onSubmit(code);
        }
      }}
    />
  );
}
