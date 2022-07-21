import {
  Button,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Files, X } from "tabler-icons-react";
import { useStyles } from "../../../hooks/useStyles";
import { useWormhole } from "../../../hooks/useWormhole";
import { Content } from "../../AppTemplate";
import FileLabel from "../../FileLabel";

type ContentProps = {
  code: string;
  copied: boolean;
  onCopy: () => void;
  onCancel: () => void;
};

export function SendInstructionsScreenContent(props: ContentProps) {
  const { classes } = useStyles();

  return (
    <Content>
      <Text className={classes.headerText}>Ready to send!</Text>
      <Stack align="center" data-testid="send-page-code-section">
        <FileLabel />
        <Text weight="bold" className={classes.grey}>
          1. Keep this tab open
        </Text>
        <Text className={classes.grey} align="center">
          Files are sent directly from your device.
          <br />
          The link/code expires once you close the tab.
        </Text>
        <Text weight="bold" className={classes.grey}>
          2. Give the receiver the link below
        </Text>
        <Group position="center">
          <TextInput
            sx={(theme) => ({ maxWidth: 380 })}
            readOnly
            type="text"
            value={`${window.location.host}/#/${props.code}`}
          />
          <Button
            disabled={props.copied}
            onClick={props.onCopy}
            pl="xs"
            pr="md"
            sx={(theme) => ({
              // TODO: shades are needed for hover events
              backgroundColor: theme.other.colors.yellow,
              color: theme.other.colors.black,
              "&:hover": {
                backgroundColor: theme.fn.darken(
                  theme.other.colors.yellow,
                  0.1
                ),
              },
            })}
          >
            <Files />
            <Space w="xs" />
            {props.copied ? "Link copied!" : "Copy"}
          </Button>
        </Group>
        <Button
          data-testid="send-page-cancel-button"
          onClick={props.onCancel}
          className={classes.secondary}
          pl="xs"
          pr="md"
        >
          <X />
          <Space w="xs" />
          Cancel
        </Button>
      </Stack>
    </Content>
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
