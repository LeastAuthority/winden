import { Button, Stack, Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, X } from "tabler-icons-react";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import FileLabel from "../../FileLabel";

type ContentProps = {
  onAccept: () => void;
  onCancel: () => void;
};

export function ReceiveConsentScreenContent(props: ContentProps) {
  return (
    <>
      <Title order={1}>Ready to download</Title>
      <Stack align="center">
        <FileLabel />
        <div>
          <Button onClick={props.onAccept}>
            <Download /> Download
          </Button>
        </div>
        <Button data-testid="send-page-cancel-button" onClick={props.onCancel}>
          <X /> Cancel
        </Button>
      </Stack>
    </>
  );
}

type Props = {};

export default function ReceiveConsentScreen({}: Props) {
  const wormhole = useWormhole();
  const error = useError();
  const navigate = useNavigate();

  return (
    <ReceiveConsentScreenContent
      onAccept={() =>
        wormhole?.fileMeta?.accept().catch((e: any) => {
          if (e.includes("unexpected EOF")) {
            navigate("/r?cancel=", { replace: true });
            window.location.reload();
          } else {
            error?.setError(detectErrorType(e));
          }
        })
      }
      onCancel={() => {
        navigate("/r", { replace: true });
        window.location.reload();
      }}
    />
  );
}
