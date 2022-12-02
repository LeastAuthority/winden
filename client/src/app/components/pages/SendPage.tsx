import React from "react";
import { useWormhole } from "../../hooks/useWormhole";
import SendBeginScreen from "../screens/send/SendBeginScreen";
import SendCompleteScreen from "../screens/send/SendCompleteScreen";
import SendInstructionsScreen from "../screens/send/SendInstructionsScreen";
import SendProgressScreen from "../screens/send/SendProgressScreen";

export default function SendPage() {
  const wormhole = useWormhole();

  if (wormhole?.state.status === "idle") {
    return <SendBeginScreen />;
  } else if (wormhole?.state.status === "sending") {
    switch (wormhole.state.step) {
      case "inProgress":
        return wormhole.state.progress ? (
          <SendProgressScreen />
        ) : (
          <SendInstructionsScreen />
        );
      case "failed":
      case "succeeded":
        return <SendCompleteScreen />;
    }
  } else {
    return null;
  }
}
