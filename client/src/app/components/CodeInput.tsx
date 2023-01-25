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
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "../hooks/useNavigate";
import { applyCodeSuggestion } from "../util/applyCodeSuggestion";
import { CODE_SEGMENT_DELIMITER } from "../util/constants";
import { getCodeSuggestion } from "../util/getCodeSuggestion";
import { makeProgressFunc } from "../util/makeProgressFunc";
import { spellCheckCodeWord } from "../util/spellCheckCodeWord";
import { CodeErrorType, validateCode } from "../util/validateCode";
import {
  requestTransfer,
  selectWormholeStatus,
  setTransferProgress,
} from "../wormholeSlice";

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
                if (e.key === "Enter" && props.onSubmit) {
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
};

export default function CodeInput(props: Props) {
  const [focused, setFocused] = useState(false);
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState(false);
  const [showError, setShowError] = useState(false);
  const codeSuggestion = getCodeSuggestion(code || "");
  const error = validateCode(code);
  const location = useLocation();
  const navigate = useNavigate();
  const wormholeStatus = useAppSelector(selectWormholeStatus);

  useEffect(() => {
    if (location.state?.code) {
      const initialCode: string = location.state?.code.substring(1);
      navigate("", { state: {} });

      setCode(initialCode);
      setTouched(true);

      if (!validateCode(initialCode) && props.onSubmit) {
        props.onSubmit(initialCode);
      } else {
        setShowError(true);
      }
    }
  }, []);

  return (
    <CodeInputContent
      code={code}
      codeSuggestion={codeSuggestion}
      focused={focused}
      touched={touched || false}
      showError={showError || false}
      errorType={error}
      submitting={wormholeStatus === "requestingReceive"}
      onChange={(e) => {
        setShowError(false);
        const hasSpace = e.target.value.includes(" ");
        if (hasSpace && codeSuggestion) {
          setCode(applyCodeSuggestion(e.target.value, codeSuggestion));
        } else if (!hasSpace) {
          setCode(e.target.value);
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
