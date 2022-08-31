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

const useStyles = createStyles((theme) => ({
  laMadeByTextLarge: {
    [`@media (min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`]:
      {
        display: "none",
      },
  },
  laMadeByTextSmall: {
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: "none",
    },
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

export default function Footer() {
  const { classes } = useStyles();

  return (
    <>
      <Space h="lg" />
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%" }}>
          <Group position="apart" className={classes.footerLarge}>
            <Group position="apart" style={{ width: 380 }} ml={32}>
              <Anchor color="black" weight={600}>
                FAQ
              </Anchor>
              <Anchor color="black" weight={600}>
                Privacy
              </Anchor>
              <Anchor color="black" weight={600}>
                About Us
              </Anchor>
              <Anchor color="black" weight={600}>
                GitHub
              </Anchor>
            </Group>
            <div style={{ flex: 1 }} />
            <Text
              size="sm"
              color="dark-grey"
              className={classNames(classes.laMadeByTextLarge)}
              weight={600}
            >
              made with love for privacy by
            </Text>
            <div>
              <Image height={30} fit="contain" src="/la-logo.svg" mr={32} />
            </div>
          </Group>
          <Stack className={classes.footerSmall}>
            <Group position="apart" mx="xl">
              <Anchor size="sm" color="black" weight={600}>
                FAQ
              </Anchor>
              <Anchor size="sm" color="black" weight={600}>
                Privacy
              </Anchor>
              <Anchor size="sm" color="black" weight={600}>
                About Us
              </Anchor>
              <Anchor size="sm" color="black" weight={600}>
                GitHub
              </Anchor>
            </Group>
            <Center>
              <Text
                size="sm"
                color="dark-grey"
                className={classNames(classes.laMadeByTextSmall)}
                weight="bold"
              >
                made with love for privacy by
              </Text>
              <div>
                <Image height={30} fit="contain" src="/la-logo.svg" />
              </div>
            </Center>
          </Stack>
          <Space h="lg" />
        </div>
      </div>
    </>
  );
}
