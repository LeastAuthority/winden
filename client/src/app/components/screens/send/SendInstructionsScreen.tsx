import {
  Button,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Files, X } from "tabler-icons-react";
import { useClipboard } from "../../../hooks/useClipboard";
import { useWormhole } from "../../../hooks/useWormhole";
import FileLabel from "../../FileLabel";

type ContentProps = {
  code: string;
  copied: boolean;
  onCopy: () => void;
  onCancel: () => void;
};

export function SendInstructionsScreenContent(props: ContentProps) {
  return (
    <>
      <Title order={1}>Ready to send!</Title>
      <Stack align="center" data-testid="send-page-code-section">
        <FileLabel />
        <Text weight="bold" color="gray">
          1. Keep this tab open
        </Text>
        <Text color="gray">Files are sent directly from your device.</Text>
        <Text color="gray">The link/code expires once you close the tab.</Text>
        <Text weight="bold" color="gray">
          2. Give the receiver the link below
        </Text>
        <Group position="center">
          <TextInput
            style={{ width: "100%" }}
            readOnly
            type="text"
            value={`${window.location.protocol}//${window.location.host}/#/${props.code}`}
          />
          <Button
            disabled={props.copied}
            onClick={props.onCopy}
            variant="light"
            color="dark"
            pl="xs"
            pr="md"
          >
            <Files />
            <Space w="xs" />
            {props.copied ? "Link copied!" : "Copy"}
          </Button>
        </Group>
        <Button
          data-testid="send-page-cancel-button"
          onClick={props.onCancel}
          variant="light"
          color="dark"
          pl="xs"
          pr="md"
        >
          <X />
          <Space w="xs" />
          Cancel
        </Button>
      </Stack>
    </>
  );
}

type Props = {};

export default function SendInstructionsScreen({}: Props) {
  const wormhole = useWormhole();
  const clipboard = useClipboard({ timeout: 2000 });
  const navigate = useNavigate();

  return wormhole?.code ? (
    <SendInstructionsScreenContent
      code={wormhole.code}
      copied={clipboard.copied}
      onCopy={() =>
        clipboard.copy(
          `${window.location.protocol}//${window.location.host}/#/${wormhole.code}`
        )
      }
      onCancel={() => {
        navigate("/s", { replace: true });
        window.location.reload();
      }}
    />
  ) : null;
}
