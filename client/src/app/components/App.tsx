import { useReducedMotion } from "@mantine/hooks";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useCodeUrlCheck } from "../hooks/useCodeUrlCheck";
import AppTemplate from "./AppTemplate";
import Navigate from "./Navigate";
import NotFoundPage from "./pages/NotFoundPage";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import StaticPage from "./pages/StaticPage";

type Props = {};

export default function App({}: Props) {
  useCodeUrlCheck();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AppTemplate>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          timeout={200}
          classNames="transition-item"
          enter={!reduceMotion}
          exit={!reduceMotion}
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate replace to="s" />} />
            <Route path="s" element={<SendPage />} />
            <Route path="r" element={<ReceivePage />} />
            <Route path="about" element={<StaticPage page="about" />} />
            <Route path="faq" element={<StaticPage page="faq" />} />
            <Route path="privacy" element={<StaticPage page="privacy" />} />
            <Route path="terms" element={<StaticPage page="terms" />} />
            <Route
              path="for-business"
              element={<StaticPage page="business" />}
            />
            <Route path="feedback" element={<StaticPage page="feedback" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </AppTemplate>
  );
}
