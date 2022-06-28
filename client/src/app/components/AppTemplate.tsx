import { AppShell, Button, Group, Paper } from "@mantine/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Send } from "tabler-icons-react";
import Background from "./Background";

type Props = React.PropsWithChildren<{}>;

export default function AppTemplate(props: Props) {
  const location = useLocation();

  return (
    <>
      <Background />
      <AppShell
        header={
          <Group position="apart">
            <span style={{ fontSize: "2rem" }}>Transfer</span>
            {location.pathname === "/s" ? (
              <Link data-testid="go-to-receive-page" to="/r">
                <Button>
                  <Download />
                  Receive
                </Button>
              </Link>
            ) : (
              <Link data-testid="go-to-send-page" to="/s">
                <Button>
                  <Send />
                  Send
                </Button>
              </Link>
            )}
          </Group>
        }
        footer={
          <Group position="apart">
            <Group position="apart" style={{ width: 380 }}>
              <a>FAQ</a>
              <a>Privacy</a>
              <a>About Us</a>
              <a>GitHub</a>
            </Group>
            <span>
              made with love for privacy by <img src="/la-logo.svg" />
            </span>
          </Group>
        }
      >
        <Paper shadow="xs" p="md">
          {props.children}
        </Paper>
      </AppShell>
    </>
  );
}
