import { Modal, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCancelModal } from "../hooks/useCancelModal";
import { useWormhole } from "../hooks/useWormhole";
import { CodeInput } from "./CodeInput";

type Props = {};

export default function ReceivePage({}: Props) {
  const wormhole = useWormhole();
  const [cancelModal, setCancelModal] = useCancelModal();
  const navigate = useNavigate();

  return wormhole?.done ? (
    <div>
      Confetti emoji{" "}
      <button
        onClick={() => {
          wormhole.reset();
          navigate("/r", { replace: true });
        }}
      >
        Okay
      </button>
    </div>
  ) : wormhole?.progressEta ? (
    <div>PROGRESS: {wormhole.progressEta}</div>
  ) : wormhole?.fileMeta ? (
    <div>
      <div>{wormhole.progressEta}</div>
      <div>
        You will download {wormhole.fileMeta.name} which has{" "}
        {wormhole.fileMeta.size} bytes.
      </div>
      <div>
        <button onClick={() => wormhole.fileMeta?.accept()}>
          Accept and download
        </button>
      </div>
    </div>
  ) : (
    <div data-testid="receive-page-container">
      <Modal
        centered
        opened={cancelModal}
        onClose={() => setCancelModal(false)}
        title="Transfer cancelled"
      >
        <Text>The transfer has been cancelled by the sender.</Text>
      </Modal>
      <h2>Receive files in real-time</h2>
      <h3>Always end-to-end encrypted.</h3>
      <CodeInput onSubmit={(code) => wormhole?.saveFile(code)} />
    </div>
  );
}
