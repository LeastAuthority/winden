import { Button, createStyles, Group, Image, Space, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, Send } from "tabler-icons-react";
import { useWormhole } from "../hooks/useWormhole";

const SUPER_NARROW_BREAKPOINT = 350;
const MOBILE_BREAKPOINT = 590;

const useLogoStyles = createStyles(() => ({
  container: {
    [`@media screen and (max-width: ${MOBILE_BREAKPOINT - 1}px)`]: {
      position: "relative",
    },
  },
  text: {
    fontSize: 20,
    fontWeight: "lighter",
    position: "relative",
    bottom: 19,
    [`@media screen and (max-width: ${SUPER_NARROW_BREAKPOINT - 1}px)`]: {
      fontSize: 14,
      position: "absolute",
      bottom: 18,
      right: 0,
    },
    [`@media screen and (min-width: ${SUPER_NARROW_BREAKPOINT}px) and (max-width: ${
      MOBILE_BREAKPOINT - 1
    }px)`]: {
      fontSize: 14,
      position: "absolute",
      bottom: 23,
      right: 0,
    },
  },
}));

function Logo() {
  const { width } = useViewportSize();
  const { classes } = useLogoStyles();
  return (
    <Group spacing={8} className={classes.container}>
      <Link to="/s">
        <Image
          width={
            width < SUPER_NARROW_BREAKPOINT
              ? 110
              : width < MOBILE_BREAKPOINT
              ? 137
              : 200
          }
          fit="contain"
          src="/LA_Winden_HorizontalLogo_Color.svg"
        />
      </Link>
      <Text color="dark-grey" className={classes.text}>
        BETA
      </Text>
    </Group>
  );
}

export default function Header() {
  const { width } = useViewportSize();
  const navigate = useNavigate();
  const wormhole = useWormhole();
  const buttonPaddingX = width < MOBILE_BREAKPOINT ? 11 : 22;
  const buttonHeight = width < MOBILE_BREAKPOINT ? 40 : 50;

  return (
    <Group
      spacing={0}
      px={width < MOBILE_BREAKPOINT ? 0 : 40}
      py={width < MOBILE_BREAKPOINT ? "xs" : "xl"}
    >
      {width < MOBILE_BREAKPOINT && <Space w={40} />}

      <Logo />

      <div style={{ flex: 1 }} />

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
          px={buttonPaddingX}
          styles={{
            root: {
              height: buttonHeight,
            },
            label: {
              fontSize: width < MOBILE_BREAKPOINT ? 14 : 16,
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
          px={buttonPaddingX}
          styles={{
            root: {
              height: buttonHeight,
            },
            label: {
              fontSize: width < MOBILE_BREAKPOINT ? 14 : 16,
            },
          }}
        >
          Send
        </Button>
      )}
    </Group>
  );
}
