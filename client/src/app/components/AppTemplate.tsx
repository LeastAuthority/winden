import {
  Anchor,
  AppShell,
  Button,
  Center,
  Container,
  Group,
  Image,
  MantineProvider,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Download, Send } from "tabler-icons-react";
import { useStyles } from "../hooks/useStyles";
import { useWormhole } from "../hooks/useWormhole";
import Background from "./Background";

type Props = React.PropsWithChildren<{}>;

export default function AppTemplate(props: Props) {
  const wormhole = useWormhole();
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <MantineProvider
      theme={{
        fontFamily: "Poppins, sans-serif",
        headings: {
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
        },
      }}
    >
      <Background />
      <Container size="lg">
        <AppShell
          padding={0}
          header={
            <>
              <Space h="lg" />
              <Group position="apart">
                <Title order={1}>Winden</Title>
                {location.pathname === "/s" ? (
                  <Button
                    data-testid="go-to-receive-page"
                    variant="light"
                    color="dark"
                    pl="xs"
                    pr="md"
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
                    <Download />
                    <Space w="xs" />
                    Receive
                  </Button>
                ) : (
                  <Button
                    data-testid="go-to-send-page"
                    variant="light"
                    color="dark"
                    pl="xs"
                    pr="md"
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
                    <Send />
                    <Space w="xs" />
                    Send
                  </Button>
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
    </MantineProvider>
  );
}
