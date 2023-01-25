import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { requestCancelTransfer } from "../../../wormholeSlice";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function ReceiveProgressScreen({}: Props) {
  const dispatch = useAppDispatch();

  return (
    <ProgressScreen
      title="Receiving..."
      waitText="Waiting for sender to complete transfer..."
      onCancel={() => {
        dispatch(requestCancelTransfer());
      }}
    />
  );
}
