import { Space, Text } from "@mantine/core";
import React from "react";
import { useCodeInput } from "../../../hooks/useCodeInput";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import CodeInput from "../../CodeInput";
import Content from "../../Content";

type ContentProps = {
  onSubmit: (code: string) => void;
  submitting: boolean;
};

export function ReceiveBeginScreenContent(props: ContentProps) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <div data-testid="receive-page-container">
        <Text className={classes.headerText} weight={300}>
          Receive files in real-time
        </Text>
        <Text component="p" color="dark-grey" weight={400}>
          Always end-to-end encrypted.
        </Text>
        <Space h={40} />
        <CodeInput onSubmit={props.onSubmit} submitting={props.submitting} />
      </div>
    </Content>
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
