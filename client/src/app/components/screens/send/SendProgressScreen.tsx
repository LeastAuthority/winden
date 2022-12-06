import React from "react";
import { useNavigate } from "react-router-dom";
import { onTabExit, useTabExitWarning } from "../../../hooks/useTabExitWarning";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function SendProgressScreen({}: Props) {
  const navigate = useNavigate();
  useTabExitWarning();

  return (
    <ProgressScreen
      title="Sending..."
      waitText="Waiting for receiver to complete transfer..."
      onCancel={() => {
        window.removeEventListener("beforeunload", onTabExit);
        navigate("/s", { replace: true });
        window.location.reload();
      }}
    />
  );
}
