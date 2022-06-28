import { Button, Space } from "@mantine/core";
import React from "react";
import { Download } from "tabler-icons-react";
import { useWormhole } from "../../../hooks/useWormhole";
import CompleteScreen from "../CompleteScreen";

type Props = {};

export default function ReceiveCompleteScreen({}: Props) {
  const wormhole = useWormhole();
  return (
    <CompleteScreen
      title="Received!"
      render={() => (
        <Button
          onClick={() => wormhole?.reset()}
          variant="light"
          color="dark"
          pl="xs"
          pr="md"
        >
          <Download />
          <Space w="xs" />
          Receive more
        </Button>
      )}
    />
  );
}
