import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useCodeUrlCheck } from "../hooks/useCodeUrlCheck";
import { useStyles } from "../hooks/useStyles";
import AppTemplate from "./AppTemplate";
import NotFoundPage from "./pages/NotFoundPage";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import SafariCheckModal from "./SafariCheckModal";

type Props = {};

export default function App({}: Props) {
  useCodeUrlCheck();
  const location = useLocation();
  const { classes } = useStyles();
  const variant = location.pathname == "/r" ? "receive" : "fade";

  return (
    <AppTemplate>
      <SafariCheckModal />
      <TransitionGroup
        component={null}
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: {
              enter: classes[`${variant}Enter`],
              enterActive: classes[`${variant}EnterActive`],
              exit: classes[`${variant}Exit`],
              exitActive: classes[`${variant}ExitActive`],
            },
          })
        }
      >
        <CSSTransition key={location.key} timeout={200}>
          <Routes location={location}>
            <Route path="/" element={<Navigate replace to="s" />} />
            <Route path="s" element={<SendPage />} />
            <Route path="r" element={<ReceivePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </AppTemplate>
  );
}
