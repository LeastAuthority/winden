import { Button, Group, Space, Text } from "@mantine/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Download, Send } from "tabler-icons-react";
import { useCommonStyles } from "../hooks/useCommonStyles";
import { useWormhole } from "../hooks/useWormhole";

export default function Header() {
  const wormhole = useWormhole();
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useCommonStyles();

  return (
    <>
      <Space h="lg" />
      <Group position="apart">
        <Text className={classes.headerText}>Transfer</Text>
        {location.pathname === "/s" ? (
          <Button
            leftIcon={<Download />}
            data-testid="go-to-receive-page"
            className={classes.secondary}
            onClick={() => {
              navigate("/r");
              if (wormhole?.fileMeta) {
                // cancellation workaround
                window.location.reload();
              } else {
                wormhole?.reset();
              }
            }}
          >
            RECEIVE
          </Button>
        ) : (
          <Button
            leftIcon={<Send />}
            data-testid="go-to-send-page"
            className={classes.secondary}
            onClick={() => {
              navigate("/s");
              if (wormhole?.fileMeta) {
                // cancellation workaround
                window.location.reload();
              } else {
                wormhole?.reset();
              }
            }}
          >
            SEND
          </Button>
        )}
      </Group>
      <Space h="lg" />
    </>
  );
}
