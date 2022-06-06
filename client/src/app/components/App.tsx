import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { useWormhole } from "../hooks/useWormhole";
import { browserIsProbablySafari } from "../util/browserIsProbablySafari";
import styles from "./App.module.css";
import Button from "./Button";
import NotFoundPage from "./NotFoundPage";
import ReceivePage from "./ReceivePage";
import SendPage from "./SendPage";

type Props = {};

function ValidateCodePage() {
  const wormhole = useWormhole();
  let params = useParams();
  let code = params.code?.match(/\d+/);

  if (!code) {
    return <NotFoundPage />;
  }

  useEffect(() => {
    // TODO: no timeout hack to wait for initiialize
    setTimeout(() => {
      wormhole?.saveFile(params.code!);
    }, 2000);
  }, []);

  return wormhole?.fileMeta ? <ReceivePage /> : <div>loading...</div>;
}

export function App({}: Props) {
  const location = useLocation();

  return browserIsProbablySafari ? (
    <div>Safari not supported.</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.layout}>
        <nav className={styles.navbar}>
          <span className={styles.navbarTitle}>Transfer</span>
          <div className={styles.spacer}></div>
          {location.pathname === "/s" && (
            <Link data-testid="go-to-receive-page" to="/r">
              <Button>
                <img className={styles.icon} src="/feather/download.svg" />
                Receive
              </Button>
            </Link>
          )}
          {location.pathname === "/r" && (
            <Link data-testid="go-to-send-page" to="/s">
              <Button>
                <img className={styles.icon} src="/feather/send.svg" />
                Send
              </Button>
            </Link>
          )}
        </nav>
        <main className={styles.content}>
          <Routes>
            <Route path="/" element={<Navigate replace to="s" />} />
            <Route path="s" element={<SendPage />} />
            <Route path="r" element={<ReceivePage />} />
            <Route path="/:code" element={<ValidateCodePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <span className={styles.footerLinks}>
            <a>FAQ</a>
            <a>Privacy</a>
            <a>About Us</a>
            <a>GitHub</a>
          </span>
          <span className={styles.footerLa}>
            made with love for privacy by <img src="/la-logo.svg" />
          </span>
        </footer>
      </div>
    </div>
  );
}
