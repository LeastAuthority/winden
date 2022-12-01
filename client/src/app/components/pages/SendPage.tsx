import React from "react";
import { useWormhole } from "../../hooks/useWormhole";
import SendBeginScreen from "../screens/send/SendBeginScreen";
import SendCompleteScreen from "../screens/send/SendCompleteScreen";
import SendInstructionsScreen from "../screens/send/SendInstructionsScreen";
import SendProgressScreen from "../screens/send/SendProgressScreen";

type Props = {
  step: "BEGIN" | "INSTRUCTIONS" | "PROGRESS" | "DONE";
};

export function SendPageContent(props: Props) {
  switch (props.step) {
    case "BEGIN":
      return <SendBeginScreen />;
    case "INSTRUCTIONS":
      return <SendInstructionsScreen />;
    case "PROGRESS":
      return <SendProgressScreen />;
    case "DONE":
      return <SendCompleteScreen />;
  }
}

export default function SendPage() {
  const wormhole = useWormhole();

  if (wormhole?.state.status === "idle") {
    return <SendPageContent step="BEGIN" />;
  } else if (wormhole?.state.status === "sending") {
    switch (wormhole.state.step) {
      case "inProgress":
        return (
          <SendPageContent
            step={wormhole.state.progress ? "PROGRESS" : "INSTRUCTIONS"}
          />
        );
      case "failed":
      case "succeeded":
        return <SendPageContent step="DONE" />;
    }
  } else {
    return null;
  }
}
