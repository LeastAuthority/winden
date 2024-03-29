import {
  Container,
  createStyles,
  MediaQuery,
  Notification,
  Space,
} from "@mantine/core";
import classnames from "classnames";
import React from "react";
import { useLocation } from "react-router-dom";
import { Check } from "tabler-icons-react";
import { dismissMessage, selectFlashMessage } from "../flashSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Background from "./Background";
import BrowserValidator from "./BrowserValidator";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const useStyles = createStyles(() => ({
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr",
  },
}));

type Props = React.PropsWithChildren<{}>;

export default function AppTemplate(props: Props) {
  const location = useLocation();
  const { classes } = useStyles();
  return (
    <BrowserValidator>
      <MediaQuery largerThan={589} styles={{ display: "none" }}>
        <div>
          <Navbar />
        </div>
      </MediaQuery>
      <Background />
      <Container size="lg">
        <div className={classes.container}>
          <Header />
          <Flash />
          <main
            data-testid="App"
            className={classnames(
              classes.main,
              location.pathname == "/s"
                ? "transition-container-send"
                : "transition-container-default"
            )}
          >
            {props.children}
          </main>
          <Footer />
        </div>
      </Container>
    </BrowserValidator>
  );
}

function Flash() {
  const flash = useAppSelector(selectFlashMessage);
  const dispatch = useAppDispatch();
  return flash ? (
    <>
      <Notification
        title={flash.title}
        icon={<Check size={24} />}
        color="teal"
        onClose={() => dispatch(dismissMessage())}
      >
        {flash.content}
      </Notification>
      <Space h="xl" />
    </>
  ) : null;
}
