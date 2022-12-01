import { Modal, Space, Text } from "@mantine/core";
import React from "react";
import { useCancelModal } from "../../../hooks/useCancelModal";
import { useCodeInput } from "../../../hooks/useCodeInput";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
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

type Props = {
  onSuccess: (accept: () => Promise<void>) => void;
};

export default function ReceiveBeginScreen(props: Props) {
  const [cancelModal, setCancelModal] = useCancelModal();
  const wormhole = useWormhole();
  const codeInput = useCodeInput();

  return (
    <ReceiveBeginScreenContent
      cancelModalOpen={cancelModal}
      onCancelModalClose={() => setCancelModal(false)}
      onSubmit={async (code) => {
        if (wormhole) {
          codeInput?.setSubmitting(true);
          const accept = await wormhole.receiveFileRequest(code);
          console.log("aaa?");
          props.onSuccess(accept as any);
        }
      }}
      submitting={codeInput?.submitting || false}
    />
  );
}
