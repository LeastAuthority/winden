import { Global, MantineProvider } from "@mantine/core";
import React from "react";

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider(props: Props) {
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        fontFamily: "Poppins, sans-serif",
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
              color: theme.other.colors.black,
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
            ".mantine-TextInput-invalid": {
              color: theme.other.colors["warning-red"],
            },
            ".mantine-Progress-root": {
              backgroundColor: theme.other.colors["light-grey"],
            },
            ".mantine-Progress-bar": {
              backgroundColor: theme.other.colors["progress-grey"],
            },
            ".transition-container-default > .transition-item-enter": {
              opacity: 0,
              transform: "translate(30px, 0)",
            },
            ".transition-container-default > .transition-item-enter-active": {
              opacity: 1,
              transform: "translate(0px, 0)",
              transition: "opacity 200ms ease-in, transform 200ms ease",
            },
            ".transition-container-default > .transition-item-exit": {
              opacity: 1,
              transform: "translate(0px, 0)",
            },
            ".transition-container-default > .transition-item-exit-active": {
              opacity: 0,
              transform: "translate(-30px, 0)",
              transition: "opacity 200ms ease-in, transform 200ms ease",
            },
            ".transition-container-send > .transition-item-enter": {
              opacity: 0,
              transform: "translate(-30px, 0)",
            },
            ".transition-container-send > .transition-item-enter-active": {
              opacity: 1,
              transform: "translate(0, 0)",
              transition: "opacity 200ms ease-in, transform 200ms ease",
            },
            ".transition-container-send > .transition-item-exit": {
              opacity: 1,
              transform: "translate(0px, 0)",
            },
            ".transition-container-send > .transition-item-exit-active": {
              opacity: 0,
              transform: "translate(30px, 0)",
              transition: "opacity 200ms ease-in, transform 200ms ease",
            },
          },
        ]}
      />
      {props.children}
    </MantineProvider>
  );
}
