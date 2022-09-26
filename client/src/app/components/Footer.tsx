import {
  Anchor,
  createStyles,
  Divider,
  Group,
  Image,
  Space,
  Text,
} from "@mantine/core";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const BREAKPOINT_MOBILE_PX = 590;
const BREAKPOINT_DESKTOP_NARROWEST_PX = 850;
const BREAKPOINT_DESKTOP_NARROWER_PX = 1050;

const useStyles = createStyles((theme) => ({
  laMadeByTextLarge: {
    [`@media (min-width: ${BREAKPOINT_DESKTOP_NARROWEST_PX}px) and (max-width: ${
      BREAKPOINT_DESKTOP_NARROWER_PX - 1
    }px)`]: {
      display: "none",
    },
  },
  footerSmall: {
    [`@media (min-width: ${BREAKPOINT_MOBILE_PX}px)`]: {
      display: "none",
    },
  },
  footerLarge: {
    margin: "0 40px",
    [`@media (max-width: ${BREAKPOINT_DESKTOP_NARROWEST_PX - 1}px)`]: {
      justifyContent: "center",
      margin: 0,
    },
    [`@media (max-width: ${BREAKPOINT_MOBILE_PX - 1}px)`]: {
      display: "none",
    },
  },
  feedbackLink: {
    backgroundColor: theme.colors.blue,
    padding: "5.5px 11px",
    borderRadius: "5px",
  },
  links: {
    [`@media (max-width: ${BREAKPOINT_DESKTOP_NARROWEST_PX - 1}px)`]: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
  },
  spacer: {
    flex: 1,
    [`@media (max-width: ${BREAKPOINT_DESKTOP_NARROWEST_PX - 1}px)`]: {
      flex: 0,
    },
  },
}));

function Links() {
  const { classes } = useStyles();

  return (
    <>
      <Anchor
        component={Link}
        className={classes.feedbackLink}
        to="/about"
        size="sm"
        color="black"
        weight={600}
      >
        Feedback
      </Anchor>
      <Anchor component={Link} to="/about" size="sm" color="black" weight={600}>
        About
      </Anchor>
      <Divider orientation="vertical" />
      <Anchor component={Link} to="/faq" size="sm" color="black" weight={600}>
        FAQ
      </Anchor>
      <Divider orientation="vertical" />
      <Anchor
        component={Link}
        to="/privacy"
        size="sm"
        color="black"
        weight={600}
      >
        Privacy
      </Anchor>
      <Divider orientation="vertical" />
      <Anchor component={Link} to="/terms" size="sm" color="black" weight={600}>
        Terms
      </Anchor>
      <Divider orientation="vertical" />
      <Anchor
        component={Link}
        to="/for-business"
        size="sm"
        color="black"
        weight={600}
      >
        For Business
      </Anchor>
      <Divider orientation="vertical" />
      <Anchor
        href="https://github.com/LeastAuthority/winden"
        target="_blank"
        size="sm"
        color="black"
        weight={600}
      >
        GitHub
      </Anchor>
    </>
  );
}

function TagLine() {
  const { classes } = useStyles();
  return (
    <>
      <Text
        size="sm"
        color="dark-grey"
        className={classNames(classes.laMadeByTextLarge)}
        weight={400}
      >
        Made with love for privacy by
      </Text>
      <Space w={8} />
      <div>
        <Image width="auto" height={30} fit="contain" src="/la-logo.svg" />
      </div>
    </>
  );
}

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div>
      <Space h="lg" />

      <Group spacing={0} position="apart" className={classes.footerLarge}>
        <Group spacing={16} className={classes.links}>
          <Links />
        </Group>
        <div className={classes.spacer} />
        <TagLine />
      </Group>

      <Group className={classes.footerSmall} position="center" spacing={0}>
        <TagLine />
      </Group>

      <Space h="lg" />
    </div>
  );
}
