import { Button } from "@mantine/core";
import React from "react";
import { Send } from "tabler-icons-react";
import { useAppDispatch } from "../../../hooks/redux";
import { reset } from "../../../wormholeSlice";
import CompleteScreen from "../CompleteScreen";

type Props = {};

export default function SendCompleteScreen({}: Props) {
  const dispatch = useAppDispatch();

  return (
    <CompleteScreen
      title="Sent!"
      render={() => (
        <Button
          leftIcon={<Send />}
          onClick={() => dispatch(reset())}
          color="blue"
        >
          Send more
        </Button>
      )}
    />
  );
}
