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
} from "@mantine/core";
import classNames from "classnames";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SwitchTransition } from "react-transition-group";
import { Download, Send } from "tabler-icons-react";
import { useStyles } from "../hooks/useStyles";
import { useWormhole } from "../hooks/useWormhole";
import Background from "./Background";

function Header() {
  const wormhole = useWormhole();
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <>
      <Space h="lg" />
      <Group position="apart">
        <Text className={classes.headerText}>Transfer</Text>
        {location.pathname === "/s" ? (
          <Button
            leftIcon={<Download />}
            data-testid="go-to-receive-page"
            className={classes.secondary}
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
            className={classes.secondary}
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

function Footer() {
  const { classes } = useStyles();
  return (
    <>
      <Space h="lg" />
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%" }}>
          <Group position="apart" className={classes.footerLarge}>
            <Group position="apart" style={{ width: 380 }} ml={32}>
              <Anchor className={classes.dark} weight={600}>
                FAQ
              </Anchor>
              <Anchor className={classes.dark} weight={600}>
                Privacy
              </Anchor>
              <Anchor className={classes.dark} weight={600}>
                About Us
              </Anchor>
              <Anchor className={classes.dark} weight={600}>
                GitHub
              </Anchor>
            </Group>
            <div style={{ flex: 1 }} />
            <Text
              size="sm"
              className={classNames(classes.grey, classes.laMadeByTextLarge)}
              weight={600}
            >
              made with love for privacy by
            </Text>
            <Image height={30} fit="contain" src="/la-logo.svg" mr={32} />
          </Group>
          <Stack className={classes.footerSmall}>
            <Group position="apart" mx="xl">
              <Anchor size="sm" className={classes.dark} weight={600}>
                FAQ
              </Anchor>
              <Anchor size="sm" className={classes.dark} weight={600}>
                Privacy
              </Anchor>
              <Anchor size="sm" className={classes.dark} weight={600}>
                About Us
              </Anchor>
              <Anchor size="sm" className={classes.dark} weight={600}>
                GitHub
              </Anchor>
            </Group>
            <Center>
              <Text
                size="sm"
                className={classNames(classes.grey, classes.laMadeByTextSmall)}
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

type ContentProps = React.PropsWithChildren<{
  fullHeight?: boolean;
}>;

export function Content(props: ContentProps) {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <div
      style={{
        gridRow: 1,
        gridColumn: 1,
      }}
    >
      <Paper
        // withBorder
        // shadow="md"
        className={classes.content}
        // style={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: "100%",
        //   height: "100%",
        // }}
        style={{
          ...(props.fullHeight ? { height: "100%" } : {}),
        }}
      >
        {props.children}
      </Paper>
    </div>
  );
}

type Props = React.PropsWithChildren<{}>;

export default function AppTemplate(props: Props) {
  const { classes } = useStyles();

  return (
    <>
      <Background />
      <Container size="lg">
        <AppShell
          // classNames={{ root: classes.appShell, body: classes.appShellBody }}
          styles={{
            root: {
              height: "100vh",
              minHeight: 640,
              display: "flex",
              flexDirection: "column",
            },
            body: {
              height: "100%",
            },
            main: {
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr",
            },
          }}
          padding={0}
          header={<Header />}
          footer={<Footer />}
        >
          {props.children}
        </AppShell>
      </Container>
    </>
  );
}
