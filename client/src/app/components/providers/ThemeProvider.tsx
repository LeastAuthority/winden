import { Global, MantineProvider } from "@mantine/core";
import React from "react";

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider(props: Props) {
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        fontFamily: "Poppins, sans-serif",
        colors: {
          gray: [
            "#111",
            "#222",
            "#6d6d6d", // darkmode dimmed
            "#333",
            "#c4c4c4", // OR separator border?
            "#555",
            "#6d6d6d", // dimmed
            "#6d6d6d", // gray
            "#000",
            "#000",
          ],
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
      <Global
        styles={(theme) => [
          {
            "@font-face": {
              fontFamily: "Poppins",
              src: `url("/Poppins/Poppins-Light.ttf") format("truetype")`,
              fontWeight: 300,
              fontStyle: "normal",
            },
          },
          {
            "@font-face": {
              fontFamily: "Poppins",
              src: `url("/Poppins/Poppins-Medium.ttf") format("truetype")`,
              fontWeight: 500,
              fontStyle: "normal",
            },
          },
          {
            "@font-face": {
              fontFamily: "Poppins",
              src: `url("/Poppins/Poppins-SemiBold.ttf") format("truetype")`,
              fontWeight: 600,
              fontStyle: "normal",
            },
          },
          {
            "@font-face": {
              fontFamily: "Poppins",
              src: `url("/Poppins/Poppins-Bold.ttf") format("truetype")`,
              fontWeight: 700,
              fontStyle: "normal",
            },
          },
          {
            body: {
              background: `linear-gradient(222.19deg, #f0f0f0 23.77%, #ffffff 98.02%)`,
              fontSize: `16px`,
            },
            ".mantine-Paper-root": {
              borderColor: theme.other.colors["medium-grey"],
            },
            ".mantine-TextInput-input": {
              borderColor: theme.other.colors["medium-grey"],
              "&:focus": {
                borderColor: theme.other.colors.blue,
              },
            },
            ".mantine-Progress-bar": {
              backgroundColor: theme.other.colors["progress-grey"],
            },
          },
        ]}
      />
      {props.children}
    </MantineProvider>
  );
}
