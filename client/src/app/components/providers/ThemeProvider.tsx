import { MantineProvider } from "@mantine/core";
import React from "react";

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider(props: Props) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Poppins, sans-serif",
        headings: {
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
        },
        other: {
          colors: {
            black: "#282f39",
            "darker-grey": "#4f4f4f",
            "dark-grey": "#6d6d6d",
            "progress-grey": "#858789",
            "medium-grey": "#c4c4c4",
            "light-grey": "#efeff1",
            tertiary: "#87b3fc",
            yellow: "#ffc64e",
            blue: "#00d4e5",
            "warning-red": "#ff6f6f",
          },
        },
      }}
    >
      {props.children}
    </MantineProvider>
  );
}
