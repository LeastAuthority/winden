import { TypographyStylesProvider } from "@mantine/core";
import React from "react";
import Content from "../Content";

type Props = React.PropsWithChildren<{}>;

export default function StaticPage(props: Props) {
  return (
    <Content>
      <TypographyStylesProvider>{props.children}</TypographyStylesProvider>
    </Content>
  );
}
