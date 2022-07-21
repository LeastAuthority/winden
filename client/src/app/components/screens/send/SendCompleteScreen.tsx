import { Button, Space } from "@mantine/core";
import React from "react";
import { Send } from "tabler-icons-react";
import { useStyles } from "../../../hooks/useStyles";
import { useWormhole } from "../../../hooks/useWormhole";
import CompleteScreen from "../CompleteScreen";

type Props = {};

export default function SendCompleteScreen({}: Props) {
  const wormhole = useWormhole();
  const { classes } = useStyles();

  return (
    <CompleteScreen
      title="Sent!"
      render={() => (
        <Button
          onClick={() => wormhole?.reset()}
          className={classes.secondary}
          pl="xs"
          pr="md"
        >
          <Send />
          <Space w="xs" />
          Send more
        </Button>
      )}
    />
  );
}
