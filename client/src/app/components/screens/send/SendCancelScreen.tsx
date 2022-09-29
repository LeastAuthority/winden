import { Button } from "@mantine/core";
import React from "react";
import { Send } from "tabler-icons-react";
import CancelScreen from "../CancelScreen";

type Props = {};

export default function SendCancelScreen({}: Props) {
  return (
    <CancelScreen
      render={() => (
        <Button leftIcon={<Send />} color="blue">
          Send a file
        </Button>
      )}
    />
  );
}
