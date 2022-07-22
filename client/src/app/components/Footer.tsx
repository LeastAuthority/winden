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
import { useCommonStyles } from "../hooks/useCommonStyles";

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
  const { classes: commonClasses } = useCommonStyles();
  const { classes } = useStyles();

  return (
    <>
      <Space h="lg" />
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%" }}>
          <Group position="apart" className={classes.footerLarge}>
            <Group position="apart" style={{ width: 380 }} ml={32}>
              <Anchor className={commonClasses.dark} weight={600}>
                FAQ
              </Anchor>
              <Anchor className={commonClasses.dark} weight={600}>
                Privacy
              </Anchor>
              <Anchor className={commonClasses.dark} weight={600}>
                About Us
              </Anchor>
              <Anchor className={commonClasses.dark} weight={600}>
                GitHub
              </Anchor>
            </Group>
            <div style={{ flex: 1 }} />
            <Text
              size="sm"
              className={classNames(
                commonClasses.grey,
                classes.laMadeByTextLarge
              )}
              weight={600}
            >
              made with love for privacy by
            </Text>
            <Image height={30} fit="contain" src="/la-logo.svg" mr={32} />
          </Group>
          <Stack className={classes.footerSmall}>
            <Group position="apart" mx="xl">
              <Anchor size="sm" className={commonClasses.dark} weight={600}>
                FAQ
              </Anchor>
              <Anchor size="sm" className={commonClasses.dark} weight={600}>
                Privacy
              </Anchor>
              <Anchor size="sm" className={commonClasses.dark} weight={600}>
                About Us
              </Anchor>
              <Anchor size="sm" className={commonClasses.dark} weight={600}>
                GitHub
              </Anchor>
            </Group>
            <Center>
              <Text
                size="sm"
                className={classNames(
                  commonClasses.grey,
                  classes.laMadeByTextSmall
                )}
                weight="bold"
              >
                made with love for privacy by
              </Text>
              <Image height={30} fit="contain" src="/la-logo.svg" />
            </Center>
          </Stack>
          <Space h="lg" />
        </div>
      </div>
    </>
  );
}
