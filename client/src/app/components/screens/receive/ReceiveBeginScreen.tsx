import { Modal, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useCancelModal } from "../../../hooks/useCancelModal";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import { CodeInput } from "../../CodeInput";

type ContentProps = {
  cancelModalOpen: boolean;
  onCancelModalClose: () => void;
  onSubmit: (code: string) => void;
};

export function ReceiveBeginScreenContent(props: ContentProps) {
  return (
    <div data-testid="receive-page-container">
      <Modal
        centered
        opened={props.cancelModalOpen}
        onClose={props.onCancelModalClose}
        title="Transfer cancelled"
      >
        <Text>The transfer has been cancelled by the sender.</Text>
      </Modal>
      <Title order={1}>Receive files in real-time</Title>
      <Title order={2}>Always end-to-end encrypted.</Title>
      <CodeInput onSubmit={props.onSubmit} />
    </div>
  );
}

type Props = {};

export default function ReceiveBeginScreen({}: Props) {
  const [cancelModal, setCancelModal] = useCancelModal();
  const wormhole = useWormhole();
  const error = useError();

  return (
    <ReceiveBeginScreenContent
      cancelModalOpen={cancelModal}
      onCancelModalClose={() => setCancelModal(false)}
      onSubmit={(code) =>
        wormhole?.saveFile(code).catch((e) => {
          error?.setError(detectErrorType(e));
        })
      }
    />
  );
}
