import { Button } from "@mantine/core";
import React from "react";
import { Download } from "tabler-icons-react";
import CancelScreen from "../CancelScreen";

type Props = {};

export default function ReceiveCancelScreen({}: Props) {
  return (
    <CancelScreen
      render={() => (
        <Button leftIcon={<Download />} color="blue">
          Receive a file
        </Button>
      )}
    />
  );
}
