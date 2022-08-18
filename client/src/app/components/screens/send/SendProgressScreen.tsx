import React from "react";
import { useWormhole } from "../../../hooks/useWormhole";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function SendProgressScreen({}: Props) {
  const wormhole = useWormhole();

  return (
    <ProgressScreen
      title="Sending..."
      waitText="Waiting for receiver to complete transfer..."
      onCancel={() => {
        wormhole?.cancelSend();
      }}
    />
  );
}
