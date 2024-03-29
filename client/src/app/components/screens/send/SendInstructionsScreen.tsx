import {
  Button,
  createStyles,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { useClipboard, useViewportSize } from "@mantine/hooks";
import React from "react";
import { Files, X } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import {
  requestCancelTransfer,
  selectIsPeerConnected,
  selectWormholeCode,
} from "../../../wormholeSlice";
import Content from "../../Content";
import FileLabel from "../../FileLabel";

type ContentProps = {
  code: string;
  isPeerConnected: boolean;
  copied: boolean;
  onCopy: () => void;
  onCancel: () => void;
};

const useStyles = createStyles(() => ({
  codeLabel: {
    backgroundColor: "#efeff1",
    height: 50,
    padding: "0 10px",
    borderRadius: 4,
    display: "inline-flex",
    alignItems: "center",
  },
}));

export function SendInstructionsScreenContent(props: ContentProps) {
  const { classes: commonClasses } = useCommonStyles();
  const { classes } = useStyles();
  const { width } = useViewportSize();
  const urlTextSize = width < 580 ? 16 : 14.4;

  return (
    <Content>
      <Text component="h1" className={commonClasses.headerText}>
        Ready to send!
      </Text>
      <Stack align="center" spacing={30} data-testid="send-page-code-section">
        <FileLabel />
        <div>
          <Text component="p" size={14.4} weight={600} color="dark-grey">
            1. Keep this tab open
          </Text>
        </div>
        <div>
          <Text
            component="p"
            size={14.4}
            weight={400}
            color="dark-grey"
            align="center"
          >
            Files are sent directly from your device.
            <br />
            The link/code expires once you close the tab.
          </Text>
        </div>
        <div>
          <Text component="p" size={14.4} weight={600} color="dark-grey">
            2. Give the receiver the link below
          </Text>
        </div>
        <Group
          position="center"
          style={{
            width: "100%",
          }}
        >
          <Text size={urlTextSize}>{window.location.host}/#</Text>
          <Text
            data-testid="code-generated"
            ml={-9}
            size={urlTextSize}
            className={classes.codeLabel}
          >
            {props.code}
          </Text>
          <Button
            leftIcon={<Files />}
            disabled={props.copied}
            onClick={props.onCopy}
            data-testid="copy-link-button"
            color="yellow"
          >
            {props.copied ? "Link copied!" : "Copy link"}
          </Button>
        </Group>
        <Group spacing="xs">
          <Loader size={14.4} />
          <Text
            component="p"
            size={14.4}
            weight={400}
            color="dark-grey"
            align="center"
          >
            {props.isPeerConnected
              ? "Receiver connected. Waiting for receiver to start transfer..."
              : "Waiting for receiver to connect..."}
          </Text>
        </Group>
        <Button
          leftIcon={<X />}
          data-testid="send-page-cancel-button"
          onClick={props.onCancel}
          color="medium-grey"
        >
          Cancel
        </Button>
      </Stack>
    </Content>
  );
}

type Props = {};

export default function SendInstructionsScreen({}: Props) {
  const clipboard = useClipboard({ timeout: 2000 });
  const wormholeCode = useAppSelector(selectWormholeCode);
  const isPeerConnected = useAppSelector(selectIsPeerConnected);
  const dispatch = useAppDispatch();

  return wormholeCode ? (
    <SendInstructionsScreenContent
      code={wormholeCode}
      isPeerConnected={isPeerConnected}
      copied={clipboard.copied}
      onCopy={() =>
        clipboard.copy(
          `${window.location.protocol}//${window.location.host}/#${wormholeCode}`
        )
      }
      onCancel={() => {
        dispatch(requestCancelTransfer());
      }}
    />
  ) : null;
}
