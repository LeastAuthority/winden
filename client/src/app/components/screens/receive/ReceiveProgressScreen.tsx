import React from "react";
import { useNavigate } from "react-router-dom";
import { onTabExit, useTabExitWarning } from "../../../hooks/useTabExitWarning";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function ReceiveProgressScreen({}: Props) {
  const navigate = useNavigate();
  useTabExitWarning();

  return (
    <ProgressScreen
      title="Receiving..."
      waitText="Waiting for sender to complete transfer..."
      onCancel={() => {
        window.removeEventListener("beforeunload", onTabExit);
        navigate("/r", { replace: true });
        window.location.reload();
      }}
    />
  );
}
