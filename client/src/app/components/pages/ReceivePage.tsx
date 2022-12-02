import React, { useState } from "react";
import { useWormhole } from "../../hooks/useWormhole";
import ReceiveBeginScreen from "../screens/receive/ReceiveBeginScreen";
import ReceiveCompleteScreen from "../screens/receive/ReceiveCompleteScreen";
import ReceiveConsentScreen from "../screens/receive/ReceiveConsentScreen";
import ReceiveProgressScreen from "../screens/receive/ReceiveProgressScreen";

export default function ReceivePage() {
  const wormhole = useWormhole();
  const [acceptFn, setAcceptFn] = useState(() => () => Promise.resolve());

  const consentScreen = <ReceiveConsentScreen accept={() => acceptFn()} />;

  if (wormhole?.state.status === "idle") {
    return <ReceiveBeginScreen onSuccess={(fn) => setAcceptFn(() => fn)} />;
  } else if (wormhole?.state.status === "receiving") {
    switch (wormhole?.state.step) {
      case "confirming":
        return consentScreen;
      case "inProgress":
        return wormhole.state.progress ? (
          <ReceiveProgressScreen />
        ) : (
          consentScreen
        );
      case "failed":
      case "succeeded":
        return <ReceiveCompleteScreen />;
    }
  } else {
    return null;
  }
}
