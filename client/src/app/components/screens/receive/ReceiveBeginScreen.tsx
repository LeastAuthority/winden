import { Space, Text, Title } from "@mantine/core";
import React from "react";
import { useCodeInput } from "../../../hooks/useCodeInput";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import { CodeInput } from "../../CodeInput";

type ContentProps = {
  onSubmit: (code: string) => void;
  submitting: boolean;
};

export function ReceiveBeginScreenContent(props: ContentProps) {
  return (
    <div data-testid="receive-page-container">
      <Title order={2}>Receive files in real-time</Title>
      <Text size="md" weight="bold" color="dimmed">
        Always end-to-end encrypted.
      </Text>
      <Space h="md" />
      <CodeInput onSubmit={props.onSubmit} submitting={props.submitting} />
    </div>
  );
}

type Props = {};

export default function ReceiveBeginScreen({}: Props) {
  const wormhole = useWormhole();
  const error = useError();
  const codeInput = useCodeInput();

  return (
    <ReceiveBeginScreenContent
      onSubmit={(code) => {
        if (wormhole) {
          codeInput?.setSubmitting(true);
          wormhole
            .saveFile(code)
            .catch((e) => {
              error?.setError(detectErrorType(e));
            })
            .finally(() => {
              codeInput?.setSubmitting(false);
            });
        }
      }}
      submitting={codeInput?.submitting || false}
    />
  );
}
