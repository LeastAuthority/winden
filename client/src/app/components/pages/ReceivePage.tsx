import React from "react";
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
  // TODO
  return <ReceivePageContent step="BEGIN" />;
}
