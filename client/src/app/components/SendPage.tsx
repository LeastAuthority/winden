import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Files, Send } from "tabler-icons-react";
import { useCancelModal } from "../hooks/useCancelModal";
import { useWormhole } from "../hooks/useWormhole";
import { durationToClosestUnit } from "../util/durationToClosestUnit";
// import Button from "./Button";
import FileLabel from "./FileLabel";
import styles from "./SendPage.module.css";

type Props = {};

const enum ModalState {
  NONE,
  FILE_TOO_LARGE,
  UPLOAD_FAILED,
}

export default function SendPage({}: Props) {
  const wormhole = useWormhole();
  const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
  const [cancelModal, setCancelModal] = useCancelModal();
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 2000 });

  function handleCancel() {
    navigate("/s", { replace: true });
    window.location.reload();
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.size <= 200 * 1000 * 1000) {
      wormhole?.sendFile(acceptedFiles[0]).catch((e) => {
        debugger;
      });
    } else if (file) {
      setModalState(ModalState.FILE_TOO_LARGE);
    } else {
      setModalState(ModalState.UPLOAD_FAILED);
    }
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div data-testid="send-page-container" className={styles.container}>
      <Modal
        centered
        opened={modalState === ModalState.FILE_TOO_LARGE}
        onClose={() => setModalState(ModalState.NONE)}
        title="Large file sizes: coming soon"
      >
        <Text>
          In this development state, this product only supports file sizes of up
          to 200 MB. Please select a smaller file.
        </Text>
      </Modal>
      <Modal
        centered
        opened={modalState === ModalState.UPLOAD_FAILED}
        onClose={() => setModalState(ModalState.NONE)}
        title="Error"
      >
        <Text>Failed to upload file.</Text>
      </Modal>
      <Modal
        centered
        opened={cancelModal}
        onClose={() => setCancelModal(false)}
        title="Transfer cancelled"
      >
        <Text>The transfer has been cancelled by the receiver.</Text>
      </Modal>
      {wormhole?.done ? (
        <>
          <Title order={1}>Sent!</Title>
          <Stack align="center">
            <FileLabel />
            <Box
              sx={(theme) => ({
                fontSize: 60,
              })}
            >
              🎉
            </Box>
            <Button onClick={() => wormhole.reset()}>
              <ActionIcon>
                <Send />
              </ActionIcon>{" "}
              Send more
            </Button>
          </Stack>
        </>
      ) : wormhole?.progressEta && wormhole?.fileMeta ? (
        <>
          <Title order={1}>Sending...</Title>
          <FileLabel />
          <Progress
            size="xl"
            value={(wormhole.bytesSent / wormhole.fileMeta.size) * 100}
          />
          <div>
            {wormhole.progressEta > 1
              ? durationToClosestUnit(wormhole.progressEta)
              : "Waiting for receiver to complete transfer..."}
          </div>
          <button data-testid="send-page-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : wormhole?.fileMeta ? (
        <>
          <Title order={1}>Ready to send!</Title>
          <Stack align="center" data-testid="send-page-code-section">
            <FileLabel />
            <Text weight="bold" color="gray">
              1. Keep this tab open
            </Text>
            <Text color="gray">Files are sent directly from your device.</Text>
            <Text color="gray">
              The link/code expires once you close the tab.
            </Text>
            <Text weight="bold" color="gray">
              2. Give the receiver the link below
            </Text>
            <Group position="center">
              <input
                readOnly
                type="text"
                value={`${window.location.protocol}//${window.location.host}/#/${wormhole.code}`}
              />
              <Button
                color={clipboard.copied ? "green" : "blue"}
                disabled={clipboard.copied}
                onClick={() =>
                  clipboard.copy(
                    `${window.location.protocol}//${window.location.host}/#/${wormhole.code}`
                  )
                }
              >
                <Files />
                {clipboard.copied ? "Link copied!" : "Copy"}
              </Button>
            </Group>
            <Button
              data-testid="send-page-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <div
          data-testid="send-page-upload-section"
          className={styles.uploadSection}
        >
          <h2>Send files in real-time</h2>
          <h3>
            We don’t store – and can’t read – your files. We simply transfer
            them.
          </h3>
          <h3>No sign-ups. No snooping. No nonsense. </h3>
          <div {...getRootProps()} className={styles.dropZone}>
            <input {...getInputProps()} data-testid="upload-file-input" />
            <b>Drag & drop any file</b>
            <span>up to 200MB</span>
            <b>or</b>
            <Button onClick={open}>
              <img src="/feather/plus.svg" className={styles.plusIcon} />
              select
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
