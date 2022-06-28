import React from "react";
import SendBeginScreen from "./screens/send/SendBeginScreen";
import SendCompleteScreen from "./screens/send/SendCompleteScreen";
import SendInstructionsScreen from "./screens/send/SendInstructionsScreen";
import SendProgressScreen from "./screens/send/SendProgressScreen";

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
