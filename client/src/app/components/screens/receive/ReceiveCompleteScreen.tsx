import { Button } from "@mantine/core";
import React from "react";
import { Download } from "tabler-icons-react";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useWormhole } from "../../../hooks/useWormhole";
import CompleteScreen from "../CompleteScreen";

type Props = {};

export default function ReceiveCompleteScreen({}: Props) {
  const wormhole = useWormhole();
  const { classes } = useCommonStyles();

  return (
    <CompleteScreen
      title="Received!"
      render={() => (
        <Button
          leftIcon={<Download />}
          onClick={() => wormhole?.reset()}
          className={classes.secondary}
        >
          Receive more
        </Button>
      )}
    />
  );
}
