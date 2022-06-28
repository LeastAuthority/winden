import {
  Anchor,
  AppShell,
  Button,
  Center,
  Container,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Send } from "tabler-icons-react";
import { useStyles } from "../hooks/useStyles";
import Background from "./Background";

type Props = React.PropsWithChildren<{}>;

export default function AppTemplate(props: Props) {
  const location = useLocation();
  const { classes } = useStyles();

  return (
    <>
      <Background />
      <Container size="lg">
        <AppShell
          padding={0}
          header={
            <>
              <Space h="lg" />
              <Group position="apart">
                <Title order={1}>Transfer</Title>
                {location.pathname === "/s" ? (
                  <Link data-testid="go-to-receive-page" to="/r">
                    <Button variant="light" color="dark" pl="xs" pr="md">
                      <Download />
                      <Space w="xs" />
                      Receive
                    </Button>
                  </Link>
                ) : (
                  <Link data-testid="go-to-send-page" to="/s">
                    <Button variant="light" color="dark" pl="xs" pr="md">
                      <Send />
                      <Space w="xs" />
                      Send
                    </Button>
                  </Link>
                )}
              </Group>
              <Space h="lg" />
            </>
          }
          footer={
            <>
              <Space h="lg" />
              <Group position="apart" className={classes.footerLarge}>
                <Group position="apart" style={{ width: 380 }} ml="lg">
                  <Anchor color="dark">FAQ</Anchor>
                  <Anchor color="dark">Privacy</Anchor>
                  <Anchor color="dark">About Us</Anchor>
                  <Anchor color="dark">GitHub</Anchor>
                </Group>
                <div style={{ flex: 1 }} />
                <Text
                  className={classes.laMadeByTextLarge}
                  color="dimmed"
                  weight="bold"
                >
                  made with love for privacy by
                </Text>
                <Image height={30} fit="contain" src="/la-logo.svg" />
              </Group>
              <Stack className={classes.footerSmall}>
                <Group position="apart" mx="xl">
                  <Anchor size="sm" color="dark">
                    FAQ
                  </Anchor>
                  <Anchor size="sm" color="dark">
                    Privacy
                  </Anchor>
                  <Anchor size="sm" color="dark">
                    About Us
                  </Anchor>
                  <Anchor size="sm" color="dark">
                    GitHub
                  </Anchor>
                </Group>
                <Center>
                  <Text
                    className={classes.laMadeByTextSmall}
                    color="dimmed"
                    weight="bold"
                  >
                    made with love for privacy by
                  </Text>
                  <Image height={30} fit="contain" src="/la-logo.svg" />
                </Center>
              </Stack>
              <Space h="lg" />
            </>
          }
        >
          <Paper withBorder shadow="md" p="md">
            {props.children}
          </Paper>
        </AppShell>
      </Container>
    </>
  );
}
