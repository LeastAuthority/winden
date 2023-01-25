import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { requestCancelTransfer } from "../../../wormholeSlice";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function SendProgressScreen({}: Props) {
  const dispatch = useAppDispatch();

  return (
    <ProgressScreen
      title="Sending..."
      waitText="Waiting for receiver to complete transfer..."
      onCancel={() => {
        dispatch(requestCancelTransfer());
      }}
    />
  );
}
