import {
  Anchor,
  Box,
  createStyles,
  Divider,
  Group,
  Image,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React from "react";
import { Link } from "react-router-dom";

const BREAKPOINT_NARROW_MOBILE_PX = 390;
const BREAKPOINT_MOBILE_PX = 590;
const BREAKPOINT_DESKTOP_NARROW_PX = 850;
const BREAKPOINT_DESKTOP_PX = 1050;

const useStyles = createStyles((theme) => ({
  feedbackLink: {
    backgroundColor: theme.colors.blue,
    padding: "5.5px 11px",
    borderRadius: "5px",
  },
}));

function Tagline() {
  return (
    <Text size="sm" color="dark-grey" weight={400}>
      Made with love for privacy by
    </Text>
  );
}

function Logo() {
  return (

    <Anchor href="https://leastauthority.com" 
      rel="noopener noreferrer">
      <Image
        width="auto"
        height={30}
        fit="contain"
        src="/la-logo.svg"
        alt="Least Authority logo"
      />
    </Anchor>
  );
}

function Links() {
  const { classes } = useStyles();

  return (
    <Group spacing={16}>
      <Anchor
        component={Link}
        className={classes.feedbackLink}
        to="/feedback"
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
        rel="noreferrer noopener"
        size="sm"
        color="black"
        weight={600}
      >
        GitHub
      </Anchor>
    </Group>
  );
}

type Props = {};

function FooterLayout(props: Props) {
  const { width } = useViewportSize();
  if (width < BREAKPOINT_NARROW_MOBILE_PX) {
    return (
      <Stack spacing={6} align="center">
        <Tagline />
        <Logo />
      </Stack>
    );
  } else if (width < BREAKPOINT_MOBILE_PX) {
    return (
      <Group spacing={8} position="center">
        <Tagline />
        <Logo />
      </Group>
    );
  } else if (width < BREAKPOINT_DESKTOP_NARROW_PX) {
    return (
      <Stack spacing={6} align="center">
        <Links />
        <Group spacing={8}>
          <Tagline />
          <Logo />
        </Group>
      </Stack>
    );
  } else {
    return (
      <Group spacing={0}>
        <Links />
        <div style={{ flex: 1 }} />
        <Group spacing={8}>
          {width >= BREAKPOINT_DESKTOP_PX && <Tagline />}
          <Logo />
        </Group>
      </Group>
    );
  }
}

export default function Footer() {
  const { width } = useViewportSize();
  return (
    <Box px={width < BREAKPOINT_DESKTOP_NARROW_PX ? 0 : 40}>
      <Space h="lg" />
      <FooterLayout />
      <Space h="lg" />
    </Box>
  );
}
