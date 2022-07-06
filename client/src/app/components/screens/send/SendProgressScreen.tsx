import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressScreen from "../ProgressScreen";

type Props = {};

export default function SendProgressScreen({}: Props) {
  const navigate = useNavigate();

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
