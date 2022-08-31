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
        fontFamily: "Poppins, sans-serif",
        colors: {
          // "bright-pink": [
          //   "#F0BBDD",
          //   "#ED9BCF",
          //   "#EC7CC3",
          //   "#ED5DB8",
          //   "#F13EAF",
          //   "#F71FA7",
          //   "#FF00A1",
          //   "#E00890",
          //   "#C50E82",
          //   "#AD1374",
          // ],
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
            ".mantine-Button-root": {
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