import { Modal, Text } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCancelModal } from "../hooks/useCancelModal";
import { useWormhole } from "../hooks/useWormhole";
import Button from "./Button";
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

  function handleCancel() {
    // TODO
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.size <= 200 * 1000 * 1000) {
      wormhole?.sendFile(acceptedFiles[0]);
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
        <div>
          Confetti emoji <button onClick={() => wormhole.reset()}>Okay</button>
        </div>
      ) : wormhole?.progressEta ? (
        <div>PROGRESS: {wormhole.progressEta}</div>
      ) : wormhole?.fileMeta ? (
        <div data-testid="send-page-code-section">
          <h3>ready to send</h3>
          {wormhole.fileMeta.name}
          <input
            readOnly
            type="text"
            value={`${window.location.protocol}//${window.location.host}/#/${wormhole.code}`}
          />
          <button data-testid="send-page-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
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
