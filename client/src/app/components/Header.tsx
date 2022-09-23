import { Button, createStyles, Group, Image, Space, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classnames from "classnames";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Download, Send } from "tabler-icons-react";
import { useWormhole } from "../hooks/useWormhole";

const useStyles = createStyles((theme) => ({
  container: {
    margin: "0 40px",
    [`@media (max-width: ${theme.breakpoints.sm - 1}px)`]: {
      margin: 0,
    },
  },
  headerText: {
    fontWeight: "lighter",
    fontSize: 14,
    color: theme.colors["dark-grey"][6],
  },
  headerTextLarge: {
    fontSize: 20,
    position: "relative",
    bottom: 7,
  },
  logo: {
    display: "flex",
  },
  logoSmall: {
    flexDirection: "column-reverse",
    alignItems: "flex-end",
    marginLeft: 40,
  },
  logoLarge: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
}));

export default function Header() {
  const wormhole = useWormhole();
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const isWideView = useMediaQuery("(min-width: 590px)");

  return (
    <div className={classes.container}>
      <Space h={isWideView ? "lg" : "xs"} />
      <Group position="apart">
        <div
          className={classnames(
            classes.logo,
            isWideView ? classes.logoLarge : classes.logoSmall
          )}
        >
          <Link to="/s">
            <Image
              width={isWideView ? 200 : 137}
              fit="contain"
              src="/LA_Winden_HorizontalLogo_Color.svg"
            />
          </Link>
          <Text
            className={classnames(classes.headerText, {
              [classes.headerTextLarge]: isWideView,
            })}
            component="span"
          >
            BETA
          </Text>
        </div>
        {location.pathname === "/s" ? (
          <Button
            leftIcon={<Download />}
            data-testid="go-to-receive-page"
            color="medium-grey"
            onClick={() => {
              navigate("/r");
              if (wormhole?.fileMeta) {
                // cancellation workaround
                window.location.reload();
              } else {
                wormhole?.reset();
              }
            }}
            styles={{
              root: !isWideView ? { padding: "0 10px" } : {},
              label: {
                fontSize: 16,
              },
            }}
          >
            Receive
          </Button>
        ) : (
          <Button
            leftIcon={<Send />}
            data-testid="go-to-send-page"
            color="medium-grey"
            onClick={() => {
              navigate("/s");
              if (wormhole?.fileMeta) {
                // cancellation workaround
                window.location.reload();
              } else {
                wormhole?.reset();
              }
            }}
            styles={{
              label: {
                fontSize: 16,
              },
            }}
          >
            Send
          </Button>
        )}
      </Group>
      <Space h={isWideView ? "lg" : "xs"} />
    </div>
  );
}
