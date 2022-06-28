import React from "react";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function ReceiveProgressScreen({}: Props) {
  return (
    <ProgressScreen
      title="Receiving..."
      waitText="Waiting for sender to complete transfer..."
    />
  );
}
