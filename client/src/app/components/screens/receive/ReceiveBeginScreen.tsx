import { Modal, Space, Text, Title } from "@mantine/core";
import React from "react";
import { useCancelModal } from "../../../hooks/useCancelModal";
import { useCodeInput } from "../../../hooks/useCodeInput";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import { CodeInput } from "../../CodeInput";

type ContentProps = {
  cancelModalOpen: boolean;
  onCancelModalClose: () => void;
  onSubmit: (code: string) => void;
  submitting: boolean;
};

export function ReceiveBeginScreenContent(props: ContentProps) {
  return (
    <div data-testid="receive-page-container">
      <Modal
        centered
        opened={props.cancelModalOpen}
        onClose={props.onCancelModalClose}
        title="Transfer failed"
      >
        <Text>The transfer was cancelled or interrupted.</Text>
        <Text>Please try again.</Text>
      </Modal>
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
