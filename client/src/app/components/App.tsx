import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import ReceivePage from "./ReceivePage";
import SendPage from "./SendPage";

type Props = {};

export function App({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="s" />} />
      <Route path="s" element={<SendPage />} />
      <Route path="r" element={<ReceivePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
