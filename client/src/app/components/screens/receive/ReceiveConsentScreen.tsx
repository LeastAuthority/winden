import { Button, Group, Space, Stack, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, X } from "tabler-icons-react";
import { useError } from "../../../hooks/useError";
import { useStyles } from "../../../hooks/useStyles";
import { useWormhole } from "../../../hooks/useWormhole";
import { detectErrorType } from "../../../util/errors";
import { Content } from "../../AppTemplate";
import FileLabel from "../../FileLabel";

type ContentProps = {
  onAccept: () => void;
  onCancel: () => void;
};

export function ReceiveConsentScreenContent(props: ContentProps) {
  const { classes } = useStyles();

  return (
    <Content>
      <Text className={classes.headerText}>Ready to download</Text>
      <Space h="md" />
      <Stack align="center">
        <FileLabel />
        <Button
          onClick={props.onAccept}
          sx={(theme) => ({
            // TODO: shades are needed for hover events
            backgroundColor: theme.other.colors.yellow,
            color: theme.other.colors.black,
            "&:hover": {
              backgroundColor: theme.fn.darken(theme.other.colors.yellow, 0.1),
            },
          })}
        >
          <Download /> Download
        </Button>
        <Space h="xl" />
        <Button
          data-testid="send-page-cancel-button"
          onClick={props.onCancel}
          className={classes.secondary}
        >
          <X /> Cancel
        </Button>
      </Stack>
    </Content>
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
