import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useCodeUrlCheck } from "../hooks/useCodeUrlCheck";
import AppTemplate from "./AppTemplate";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPage from "./pages/PrivacyPage";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";

type Props = {};

export default function App({}: Props) {
  useCodeUrlCheck();

  return (
    <AppTemplate>
      <Routes>
        <Route path="/" element={<Navigate replace to="s" />} />
        <Route path="s" element={<SendPage />} />
        <Route path="r" element={<ReceivePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppTemplate>
  );
}
