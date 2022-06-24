import {
  Box,
  Button,
  Modal,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, X } from "tabler-icons-react";
import { useCancelModal } from "../hooks/useCancelModal";
import { useError } from "../hooks/useError";
import { useWormhole } from "../hooks/useWormhole";
import { durationToClosestUnit } from "../util/durationToClosestUnit";
import { detectErrorType } from "../util/errors";
import { CodeInput } from "./CodeInput";
import FileLabel from "./FileLabel";

type Props = {};

export default function ReceivePage({}: Props) {
  const wormhole = useWormhole();
  const [cancelModal, setCancelModal] = useCancelModal();
  const navigate = useNavigate();
  const error = useError();

  function handleCancel() {
    navigate("/r", { replace: true });
    window.location.reload();
  }

  return wormhole?.done ? (
    <>
      <Title order={1}>Received!</Title>
      <Stack align="center">
        <FileLabel />
        <Box
          sx={(theme) => ({
            fontSize: 60,
          })}
        >
          🎉
        </Box>
        <Button
          onClick={() => {
            wormhole.reset();
            navigate("/r", { replace: true });
          }}
        >
          <Download /> Receive more
        </Button>
      </Stack>
    </>
  ) : wormhole?.progressEta && wormhole?.fileMeta ? (
    <>
      <Title order={1}>Receiving...</Title>
      <FileLabel />
      <Progress
        size="xl"
        value={(wormhole.bytesSent / wormhole.fileMeta.size) * 100}
      />
      <div>
        {wormhole.progressEta > 1
          ? durationToClosestUnit(wormhole.progressEta)
          : "Waiting for sender to complete transfer..."}
      </div>
      <Button data-testid="receive-page-cancel-button" onClick={handleCancel}>
        <X /> Cancel
      </Button>
    </>
  ) : wormhole?.fileMeta ? (
    <>
      <Title order={1}>Ready to download</Title>
      <Stack align="center">
        <FileLabel />
        <div>
          <Button
            onClick={() =>
              wormhole.fileMeta?.accept().catch((e: any) => {
                if (e.includes("unexpected EOF")) {
                  navigate("/r?cancel=", { replace: true });
                  window.location.reload();
                } else {
                  error?.setError(detectErrorType(e));
                }
              })
            }
          >
            <Download /> Download
          </Button>
        </div>
        <Button data-testid="send-page-cancel-button" onClick={handleCancel}>
          <X /> Cancel
        </Button>
      </Stack>
    </>
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
      <CodeInput
        onSubmit={(code) =>
          wormhole?.saveFile(code).catch((e) => {
            error?.setError(detectErrorType(e));
          })
        }
      />
    </div>
  );
}
