import { Global, MantineProvider, Tuple } from "@mantine/core";
import React from "react";

function sameShade(color: string) {
  return Array(10).fill(color) as Tuple<string, 10>;
}

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider(props: Props) {
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        components: {
          AppShell: {
            styles: (theme) => ({
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
                minHeight: 0,
              },
            }),
          },
          Button: {
            styles: (theme) => ({
              root: {
                color: theme.colors.black[6],
                height: 50,
                padding: "0 22px",
              },
            }),
          },
          TextInput: {
            styles: (theme) => ({
              input: {
                backgroundColor: theme.colors["light-grey"][6],
                border: "none",
                height: 50,
              },
            }),
          },
        },
        fontFamily: "Poppins, sans-serif",
        colors: {
          black: sameShade("#282f39"),
          "darker-grey": sameShade("#4f4f4f"),
          "dark-grey": sameShade("#6d6d6d"),
          "progress-grey": sameShade("#858789"),
          "medium-grey": sameShade("#c4c4c4"),
          "light-grey": sameShade("#efeff1"),
          tertiary: sameShade("#87b3fc"),
          yellow: sameShade("#ffc64e"),
          blue: sameShade("#00d4e5"),
          "warning-red": sameShade("#ff6f6f"),
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
              color: theme.colors.black[6],
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
