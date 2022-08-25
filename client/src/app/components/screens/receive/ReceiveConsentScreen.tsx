import { Button, Group, Space, Stack, Title } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, X } from "tabler-icons-react";
import { useError } from "../../../hooks/useError";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import FileLabel from "../../FileLabel";

type ContentProps = {
  submitting: boolean;
  onAccept: () => void;
  onCancel: () => void;
};

export function ReceiveConsentScreenContent(props: ContentProps) {
  return (
    <>
      <Title order={2}>Ready to download</Title>
      <Space h="md" />
      <Stack align="center">
        <FileLabel />
        <Group>
          <Button
            onClick={props.onAccept}
            loading={props.submitting}
            color="blue"
          >
            <Download /> Download
          </Button>
          <Button
            data-testid="send-page-cancel-button"
            onClick={props.onCancel}
            variant="light"
            color="dark"
          >
            <X /> Cancel
          </Button>
        </Group>
      </Stack>
    </>
  );
}

type Props = {};

export default function ReceiveConsentScreen({}: Props) {
  const wormhole = useWormhole();
  const error = useError();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  return (
    <ReceiveConsentScreenContent
      submitting={submitting}
      onAccept={() => {
        setSubmitting(true);
        wormhole?.fileMeta?.accept().finally(() => {
          setSubmitting(false);
        });
      }}
      onCancel={() => {
        wormhole?.cancelSave();
      }}
    />
  );
}
