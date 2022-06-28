import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppTemplate from "./AppTemplate";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import NotFoundPage from "./pages/NotFoundPage";

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppTemplate>
  );
}
