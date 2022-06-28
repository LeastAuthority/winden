import React from "react";
import { useWormhole } from "../../hooks/useWormhole";
import ReceiveBeginScreen from "../screens/receive/ReceiveBeginScreen";
import ReceiveCompleteScreen from "../screens/receive/ReceiveCompleteScreen";
import ReceiveConsentScreen from "../screens/receive/ReceiveConsentScreen";
import ReceiveProgressScreen from "../screens/receive/ReceiveProgressScreen";

type Props = {
  step: "BEGIN" | "CONSENT" | "PROGRESS" | "DONE";
};

export function ReceivePageContent(props: Props) {
  switch (props.step) {
    case "BEGIN":
      return <ReceiveBeginScreen />;
    case "CONSENT":
      return <ReceiveConsentScreen />;
    case "PROGRESS":
      return <ReceiveProgressScreen />;
    case "DONE":
      return <ReceiveCompleteScreen />;
  }
}

export default function ReceivePage() {
  const wormhole = useWormhole();

  return (
    <ReceivePageContent
      step={
        wormhole?.done
          ? "DONE"
          : wormhole?.progressEta
          ? "PROGRESS"
          : wormhole?.fileMeta
          ? "CONSENT"
          : "BEGIN"
      }
    />
  );
}
