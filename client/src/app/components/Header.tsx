import { Button, createStyles, Group, Space, Text } from "@mantine/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Download, Send } from "tabler-icons-react";
import { useCommonStyles } from "../hooks/useCommonStyles";
import { useWormhole } from "../hooks/useWormhole";

const useStyles = createStyles((theme) => ({
  headerTextSuper: {
    fontWeight: "lighter",
    fontSize: 20,
    color: theme.other.colors["dark-grey"],
  },
}));

export default function Header() {
  const wormhole = useWormhole();
  const location = useLocation();
  const navigate = useNavigate();
  const { classes: commonClasses } = useCommonStyles();
  const { classes } = useStyles();

  return (
    <>
      <Space h="lg" />
      <Group position="apart">
        <Group align="start" spacing="xs">
          <Text className={commonClasses.headerText} component="span">
            Transfer
          </Text>
          <Text className={classes.headerTextSuper} component="span">
            BETA
          </Text>
        </Group>
        {location.pathname === "/s" ? (
          <Button
            leftIcon={<Download />}
            data-testid="go-to-receive-page"
            className={commonClasses.secondary}
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
            className={commonClasses.secondary}
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
