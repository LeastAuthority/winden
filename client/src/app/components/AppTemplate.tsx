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
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import { Download, Send } from "tabler-icons-react";
import { useStyles } from "../hooks/useStyles";
import { useWormhole } from "../hooks/useWormhole";
import Background from "./Background";
import ThemeProvider from "./providers/ThemeProvider";

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
            RECEIVE
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
      <Group position="apart" className={classes.footerLarge}>
        <Group position="apart" style={{ width: 380 }} ml={32}>
          <Anchor color="dark">FAQ</Anchor>
          <Anchor color="dark">Privacy</Anchor>
          <Anchor color="dark">About Us</Anchor>
          <Anchor color="dark">GitHub</Anchor>
        </Group>
        <div style={{ flex: 1 }} />
        <Text
          size="sm"
          className={classes.laMadeByTextLarge}
          color="dimmed"
          weight="bold"
        >
          made with love for privacy by
        </Text>
        <Image height={30} fit="contain" src="/la-logo.svg" mr={32} />
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
            size="sm"
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
  );
}

type ContentProps = React.PropsWithChildren<{}>;

function Content(props: ContentProps) {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <SwitchTransition>
      {/* // TODO route based animation instead of all of them the same */}
      <CSSTransition
        key={location.key}
        classNames={{
          enter: classes.fadeEnter,
          enterActive: classes.fadeEnterActive,
          exit: classes.fadeExit,
          exitActive: classes.fadeExitActive,
        }}
        timeout={300}
      >
        {/* <div style={{ position: "relative" }}> */}
        <Paper
          // withBorder
          // shadow="md"
          className={classes.content}
          // style={{ position: "absolute", width: "100%" }}
        >
          {props.children}
        </Paper>
        {/* </div> */}
      </CSSTransition>
    </SwitchTransition>
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
          classNames={{ root: classes.appShell, body: classes.appShellBody }}
          padding={0}
          header={<Header />}
          footer={<Footer />}
        >
          <Content>{props.children}</Content>
        </AppShell>
      </Container>
    </>
  );
}
