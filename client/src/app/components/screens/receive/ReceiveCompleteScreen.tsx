import { Button } from "@mantine/core";
import React from "react";
import { Download } from "tabler-icons-react";
import { useAppDispatch } from "../../../hooks/redux";
import { reset } from "../../../wormholeSlice";
import CompleteScreen from "../CompleteScreen";

type Props = {};

export default function ReceiveCompleteScreen({}: Props) {
  const dispatch = useAppDispatch();

  return (
    <CompleteScreen
      title="Received!"
      render={() => (
        <Button
          leftIcon={<Download />}
          onClick={() => dispatch(reset())}
          color="blue"
        >
          Receive more
        </Button>
      )}
    />
  );
}
