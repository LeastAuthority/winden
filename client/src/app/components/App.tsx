import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppTemplate from "./AppTemplate";
import ReceivePage from "./ReceivePage";
import NotFoundScreen from "./screens/NotFoundScreen";
import SendPage from "./SendPage";

function ValidateCode() {
  return <div>TODO validate code and redirect to /r</div>;
}

type Props = {};

export default function App({}: Props) {
  return (
    <AppTemplate>
      <Routes>
        <Route path="/" element={<Navigate replace to="s" />} />
        <Route path="s" element={<SendPage />} />
        <Route path="r" element={<ReceivePage />} />
        <Route path="/:code" element={<ValidateCode />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </AppTemplate>
  );
}
