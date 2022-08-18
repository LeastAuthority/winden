import React from "react";
import { useWormhole } from "../../../hooks/useWormhole";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function ReceiveProgressScreen({}: Props) {
  const wormhole = useWormhole();

  return (
    <ProgressScreen
      title="Receiving..."
      waitText="Waiting for sender to complete transfer..."
      onCancel={() => {
        wormhole?.cancelSave();
      }}
    />
  );
}
