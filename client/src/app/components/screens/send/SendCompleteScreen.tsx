import { Button, Space } from "@mantine/core";
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
          onClick={() => wormhole?.reset()}
          variant="light"
          color="dark"
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
