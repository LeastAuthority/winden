import { useReducedMotion } from "@mantine/hooks";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useCodeUrlCheck } from "../hooks/useCodeUrlCheck";
import { useFlash } from "../hooks/useFlash";
import { useTargetHighlights } from "../hooks/useTargetHighlights";
import AppTemplate from "./AppTemplate";
import Navigate from "./Navigate";
import NotFoundPage from "./pages/NotFoundPage";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import AboutPage from "./pages/static/AboutPage";
import BusinessPage from "./pages/static/BusinessPage";
import FaqPage from "./pages/static/FaqPage";
import FeedbackPage from "./pages/static/FeedbackPage";
import PrivacyPage from "./pages/static/PrivacyPage";
import TermsPage from "./pages/static/TermsPage";

type Props = {};

export default function App({}: Props) {
  useCodeUrlCheck();
  useTargetHighlights();

  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const flash = useFlash();

  useEffect(() => {
    flash?.set(null);
  }, [location.pathname]);

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
            <Route path="about" element={<AboutPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="for-business" element={<BusinessPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </AppTemplate>
  );
}
