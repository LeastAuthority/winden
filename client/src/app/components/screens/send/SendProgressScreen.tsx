import React from "react";
import { useNavigate } from "react-router-dom";
import { useTabExitWarning } from "../../../hooks/useTabExitWarning";
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
        navigate("/s", { replace: true });
        window.location.reload();
      }}
    />
  );
}
