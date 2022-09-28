import {
  Button,
  createStyles,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Files, X } from "tabler-icons-react";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useWormhole } from "../../../hooks/useWormhole";
import Content from "../../Content";
import FileLabel from "../../FileLabel";

type ContentProps = {
  code: string;
  copied: boolean;
  onCopy: () => void;
  onCancel: () => void;
};

const useStyles = createStyles(() => ({
  codeLabel: {
    backgroundColor: "#efeff1",
    height: 50,
    fontSize: 14.4,
    padding: "0 15px",
    borderRadius: 4,
    display: "inline-flex",
    alignItems: "center",
  },
}));

export function SendInstructionsScreenContent(props: ContentProps) {
  const { classes: commonClasses } = useCommonStyles();
  const { classes } = useStyles();

  return (
    <Content>
      <Text className={commonClasses.headerText}>Ready to send!</Text>
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
          <Text>{window.location.host}/#</Text>
          <Text className={classes.codeLabel}>{props.code}</Text>
          <Button
            leftIcon={<Files />}
            disabled={props.copied}
            onClick={props.onCopy}
            color="yellow"
          >
            {props.copied ? "Link copied!" : "Copy"}
          </Button>
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
  const wormhole = useWormhole();
  const clipboard = useClipboard({ timeout: 2000 });
  const navigate = useNavigate();

  return wormhole?.code ? (
    <SendInstructionsScreenContent
      code={wormhole.code}
      copied={clipboard.copied}
      onCopy={() =>
        clipboard.copy(
          `${window.location.protocol}//${window.location.host}/#${wormhole.code}`
        )
      }
      onCancel={() => {
        navigate("/s", { replace: true });
        window.location.reload();
      }}
    />
  ) : null;
}
