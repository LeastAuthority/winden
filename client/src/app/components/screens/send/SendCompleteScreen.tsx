import { Button } from "@mantine/core";
import React from "react";
import { Send } from "tabler-icons-react";
import { useWormhole } from "../../../hooks/useWormhole";
import CompleteScreen from "../CompleteScreen";

type Props = {};

export default function SendCompleteScreen({}: Props) {
  const wormhole = useWormhole();

  return (
    <CompleteScreen
      title="Sent!"
      render={() => (
        <Button
          leftIcon={<Send />}
          onClick={() => wormhole?.reset()}
          color="blue"
        >
          Send more
        </Button>
      )}
    />
  );
}
