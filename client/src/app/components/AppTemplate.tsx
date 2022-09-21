import { AppShell, Container } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";
import Background from "./Background";
import BrowserValidator from "./BrowserValidator";
import Footer from "./Footer";
import Header from "./Header";

export type ContentProps = React.PropsWithChildren<{
  fullHeight?: boolean;
}>;

type Props = React.PropsWithChildren<{}>;

export default function AppTemplate(props: Props) {
  const location = useLocation();
  return (
    <BrowserValidator>
      <Background>
        <Container size="lg">
          <AppShell
            classNames={{
              main:
                location.pathname == "/s"
                  ? "transition-container-send"
                  : "transition-container-default",
            }}
            padding={0}
            header={<Header />}
            footer={<Footer />}
          >
            {props.children}
          </AppShell>
        </Container>
      </Background>
    </BrowserValidator>
  );
}
