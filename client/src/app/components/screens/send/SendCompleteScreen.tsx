import { Button } from "@mantine/core";
import React from "react";
import { Send } from "tabler-icons-react";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useWormhole } from "../../../hooks/useWormhole";
import CompleteScreen from "../CompleteScreen";

type Props = {};

export default function SendCompleteScreen({}: Props) {
  const wormhole = useWormhole();
  const { classes } = useCommonStyles();

  return (
    <CompleteScreen
      title="Sent!"
      render={() => (
        <Button
          leftIcon={<Send />}
          onClick={() => wormhole?.reset()}
          className={classes.secondary}
        >
          Send more
        </Button>
      )}
    />
  );
}
