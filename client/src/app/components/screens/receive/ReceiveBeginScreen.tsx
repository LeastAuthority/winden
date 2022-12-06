import { Modal, Space, Text } from "@mantine/core";
import React from "react";
import { useCancelModal } from "../../../hooks/useCancelModal";
import { useCodeInput } from "../../../hooks/useCodeInput";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import CodeInput from "../../CodeInput";
import Content from "../../Content";

type ContentProps = {
  cancelModalOpen: boolean;
  onCancelModalClose: () => void;
  onSubmit: (code: string) => void;
  submitting: boolean;
};

export function ReceiveBeginScreenContent(props: ContentProps) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <div data-testid="receive-page-container">
        <Modal
          centered
          opened={props.cancelModalOpen}
          onClose={props.onCancelModalClose}
          title="Transfer cancelled/interrupted"
        >
          <Text component="p">Either:</Text>
          <Text component="p"></Text>
          <Text component="p">- The transfer was cancelled by the sender.</Text>
          <Text component="p">
            - Your or the sender's Internet connection was interrupted.
          </Text>
          <Text component="p"></Text>
          <Text component="p">Please try again.</Text>
        </Modal>
        <Text component="h1" className={classes.headerText} weight={300}>
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
  const [cancelModal, setCancelModal] = useCancelModal();
  const wormhole = useWormhole();
  const error = useError();
  const codeInput = useCodeInput();

  return (
    <ReceiveBeginScreenContent
      cancelModalOpen={cancelModal}
      onCancelModalClose={() => setCancelModal(false)}
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
