import { AppShell, Container } from "@mantine/core";
import React from "react";
import Background from "./Background";
import Footer from "./Footer";
import Header from "./Header";

export type ContentProps = React.PropsWithChildren<{
  fullHeight?: boolean;
}>;

type Props = React.PropsWithChildren<{}>;

export default function AppTemplate(props: Props) {
  return (
    <>
      <Background />
      <Container size="lg">
        <AppShell
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
