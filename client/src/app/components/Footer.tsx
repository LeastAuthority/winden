import {
  Anchor,
  Center,
  createStyles,
  Group,
  Image,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  laMadeByTextLarge: {
    [`@media (min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`]:
      {
        display: "none",
      },
  },
  laMadeByTextSmall: {
    // [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
    //   display: "none",
    // },
  },
  footerLarge: {
    [`@media (max-width: ${theme.breakpoints.sm - 1}px)`]: {
      display: "none",
    },
  },
  footerSmall: {
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
}));

function Links() {
  return (
    <>
      <Anchor component={Link} to="/faq" size="sm" color="black" weight={600}>
        FAQ
      </Anchor>
      <Anchor
        component={Link}
        to="/privacy"
        size="sm"
        color="black"
        weight={600}
      >
        Privacy
      </Anchor>
      <Anchor component={Link} to="/about" size="sm" color="black" weight={600}>
        About Us
      </Anchor>
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

export default function Footer() {
  const { classes } = useStyles();

  return (
    <>
      <Space h="lg" />

      <Group spacing={8} position="apart" className={classes.footerLarge}>
        <Group position="apart" style={{ width: 380 }} ml={40}>
          <Links />
        </Group>
        <div style={{ flex: 1 }} />
        <Text
          size="sm"
          color="dark-grey"
          className={classNames(classes.laMadeByTextLarge)}
          weight={600}
        >
          Made with love for privacy by
        </Text>
        <div>
          <Image width="auto" height={30} fit="contain" src="/la-logo.svg" />
        </div>
        <Space w={40} />
      </Group>

      <Stack className={classes.footerSmall}>
        <Group position="center" spacing={60}>
          <Links />
        </Group>
        <Center>
          <Text
            size="sm"
            color="dark-grey"
            className={classNames(classes.laMadeByTextSmall)}
            weight="bold"
          >
            Made with love for privacy by
          </Text>
          <div>
            <Image width="auto" height={30} fit="contain" src="/la-logo.svg" />
          </div>
        </Center>
      </Stack>

      <Space h="lg" />
    </>
  );
}
