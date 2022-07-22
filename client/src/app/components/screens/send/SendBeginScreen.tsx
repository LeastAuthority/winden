import { createStyles, Modal, Space, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FileRejection } from "react-dropzone";
import { useCancelModal } from "../../../hooks/useCancelModal";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useWormhole } from "../../../hooks/useWormhole";
import Content from "../../Content";
import Dropzone from "../../Dropzone";

const useStyles = createStyles((_theme) => ({
  sendPageSection: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
}));

type ModalState =
  | "NONE"
  | "TRANSFER_CANCELLED"
  | "FILE_TOO_LARGE"
  | "OTHER_ERROR";

type ContentProps = {
  modalState: ModalState;
  onDrop: (files: File[]) => void;
  onReject: (rejections: FileRejection[]) => void;
  onModalClose: () => void;
};

export function SendBeginScreenContent(props: ContentProps) {
  const { classes: commonClasses } = useCommonStyles();
  const { classes } = useStyles();

  return (
    <Content fullHeight>
      <div
        data-testid="send-page-upload-section"
        className={classes.sendPageSection}
      >
        <Modal
          centered
          opened={props.modalState === "FILE_TOO_LARGE"}
          onClose={props.onModalClose}
          title="Large file sizes: coming soon"
        >
          <Text>
            In this development state, this product only supports file sizes of
            up to 200 MB. Please select a smaller file.
          </Text>
        </Modal>
        <Modal
          centered
          opened={props.modalState === "OTHER_ERROR"}
          onClose={props.onModalClose}
          title="Error"
        >
          <Text>Failed to upload file.</Text>
        </Modal>
        <Modal
          centered
          opened={props.modalState === "TRANSFER_CANCELLED"}
          onClose={props.onModalClose}
          title="Transfer failed"
        >
          <Text>The transfer was cancelled or interrupted.</Text>
          <Text>Please try again.</Text>
        </Modal>
        <Text className={commonClasses.headerText}>
          Send files in real-time
        </Text>
        <Text className={commonClasses.grey} weight={300}>
          We don’t store – and can’t read – your files. We simply transfer them.
        </Text>
        <Text className={commonClasses.grey} weight={300}>
          No sign-ups. No snooping. No nonsense.{" "}
        </Text>
        <Space h="md" />
        <Dropzone onDrop={props.onDrop} onReject={props.onReject} />
      </div>
    </Content>
  );
}

type Props = {};

export default function SendBeginScreen(props: Props) {
  const wormhole = useWormhole();
  const [modalState, setModalState] = useState<ModalState>("NONE");
  const [cancelModal, _setCancelModal] = useCancelModal();

  useEffect(() => {
    if (cancelModal) {
      setModalState("TRANSFER_CANCELLED");
    }
  }, [cancelModal]);

  return (
    <SendBeginScreenContent
      modalState={modalState}
      onDrop={(files) => {
        wormhole?.sendFile(files[0]);
      }}
      onReject={(rejections) => {
        if (rejections[0]) {
          setModalState("FILE_TOO_LARGE");
        } else {
          setModalState("OTHER_ERROR");
        }
      }}
      onModalClose={() => setModalState("NONE")}
    />
  );
}
