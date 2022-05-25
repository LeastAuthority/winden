import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useWormhole } from "../hooks/useWormhole";
import Button from "./Button";
import styles from "./SendPage.module.css";

type Props = {};

export default function SendPage({}: Props) {
  const wormhole = useWormhole();

  function handleCancel() {
    // TODO
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      wormhole?.sendFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div data-testid="send-page-container" className={styles.container}>
      {wormhole?.fileMeta ? (
        <div data-testid="send-page-code-section">
          <h3>send this code: {wormhole.code}</h3>
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
