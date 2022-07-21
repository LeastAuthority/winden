import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppTemplate from "./AppTemplate";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useCodeUrlCheck } from "../hooks/useCodeUrlCheck";
import SafariCheckModal from "./SafariCheckModal";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useStyles } from "../hooks/useStyles";

type Props = {};

export default function App({}: Props) {
  useCodeUrlCheck();
  const location = useLocation();
  const { classes } = useStyles();

  return (
    <AppTemplate>
      <SafariCheckModal />
          <Routes location={location}>
            <Route path="/" element={<Navigate replace to="s" />} />
            <Route path="s" element={<SendPage />} />
            <Route path="r" element={<ReceivePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
    </AppTemplate>
  );
}
