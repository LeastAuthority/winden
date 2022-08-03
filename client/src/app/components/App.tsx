import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppTemplate from "./AppTemplate";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useCodeUrlCheck } from "../hooks/useCodeUrlCheck";

type Props = {};

export default function App({}: Props) {
  useCodeUrlCheck();

  return (
    <AppTemplate>
      <Routes>
        <Route path="/" element={<Navigate replace to="s" />} />
        <Route path="s" element={<SendPage />} />
        <Route path="r" element={<ReceivePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppTemplate>
  );
}
