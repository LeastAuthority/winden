import { Group, Modal, Space, Text, Title } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import React, { useState } from "react";
import { FileRejection } from "react-dropzone";
import { Upload } from "tabler-icons-react";
import { useWormhole } from "../../../hooks/useWormhole";

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
  return (
    <div data-testid="send-page-upload-section">
      <Modal
        centered
        opened={props.modalState === "FILE_TOO_LARGE"}
        onClose={props.onModalClose}
        title="Large file sizes: coming soon"
      >
        <Text>
          In this development state, this product only supports file sizes of up
          to 200 MB. Please select a smaller file.
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
      <Title order={2}>Send files in real-time</Title>
      <Text size="md" weight="bold" color="dimmed">
        We don’t store – and can’t read – your files. We simply transfer them.
      </Text>
      <Text size="md" weight="bold" color="dimmed">
        No sign-ups. No snooping. No nonsense.{" "}
      </Text>
      <Space h="md" />
      <Dropzone
        onDrop={props.onDrop}
        onReject={props.onReject}
        maxSize={
          process.env.NODE_ENV === "production" ? 2 * 10 ** 8 : undefined
        }
        multiple={false}
      >
        {(status) => (
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
          >
            <Upload />
            <div>
              <Text size="xl" inline>
                Drag file here or click to select file
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                File should not exceed 200MB
              </Text>
            </div>
          </Group>
        )}
      </Dropzone>
    </div>
  );
}

type Props = {};

export default function SendBeginScreen(props: Props) {
  const wormhole = useWormhole();
  const [modalState, setModalState] = useState<ModalState>("NONE");

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
