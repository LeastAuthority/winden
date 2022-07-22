import { createStyles } from "@mantine/core";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useCodeUrlCheck } from "../hooks/useCodeUrlCheck";
import AppTemplate from "./AppTemplate";
import NotFoundPage from "./pages/NotFoundPage";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import SafariCheckModal from "./SafariCheckModal";

type Props = {};

const useStyles = createStyles((_theme) => ({
  defaultEnter: {
    opacity: 0,
    transform: "translate(0, 25px)",
    zIndex: 1,
  },
  defaultEnterActive: {
    opacity: 1,
    transform: "translate(0, 0)",
    transition: "opacity 200ms ease-out, transform 200ms ease",
  },
  defaultExit: {
    opacity: 1,
    transform: "translate(0, 0)",
  },
  defaultExitActive: {
    opacity: 0,
    transform: "translate(0, 30px)",
    transition: "opacity 200ms ease-out, transform 200ms ease",
  },
  receiveEnter: {
    opacity: 0,
    transform: "translate(25px, 25px)",
    zIndex: 1,
  },
  receiveEnterActive: {
    opacity: 1,
    transform: "translate(0, 0)",
    transition: "opacity 200ms ease-out, transform 200ms ease",
  },
  receiveExit: {
    opacity: 1,
    transform: "translate(0, 0)",
  },
  receiveExitActive: {
    opacity: 0,
    transform: "translate(30px, 30px)",
    transition: "opacity 200ms ease-out, transform 200ms ease",
  },
}));

export default function App({}: Props) {
  useCodeUrlCheck();
  const location = useLocation();
  const { classes } = useStyles();
  const variant = location.pathname == "/r" ? "receive" : "default";

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
