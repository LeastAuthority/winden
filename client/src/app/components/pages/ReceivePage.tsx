import React, { useState } from "react";
import { useWormhole } from "../../hooks/useWormhole";
import ReceiveBeginScreen from "../screens/receive/ReceiveBeginScreen";
import ReceiveCompleteScreen from "../screens/receive/ReceiveCompleteScreen";
import ReceiveConsentScreen from "../screens/receive/ReceiveConsentScreen";
import ReceiveProgressScreen from "../screens/receive/ReceiveProgressScreen";

type Props = {
  step: "BEGIN" | "CONSENT" | "PROGRESS" | "DONE";
};

export default function ReceivePage() {
  const wormhole = useWormhole();
  const [acceptFn, setAcceptFn] = useState(() => () => Promise.resolve());

  if (wormhole?.state.status === "idle") {
    return <ReceiveBeginScreen onSuccess={(fn) => setAcceptFn(() => fn)} />;
  } else if (wormhole?.state.status === "receiving") {
    switch (wormhole?.state.step) {
      case "confirming":
        return <ReceiveConsentScreen accept={() => acceptFn()} />;
      case "inProgress":
        return <ReceiveProgressScreen />;
      case "failed":
      case "succeeded":
        return <ReceiveCompleteScreen />;
    }
  } else {
    return null;
  }
}
