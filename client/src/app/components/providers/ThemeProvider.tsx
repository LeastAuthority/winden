import {
  ButtonStylesParams,
  Global,
  MantineProvider,
  Tuple,
} from "@mantine/core";
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
                display: "flex",
                flexDirection: "column",
                "@media (min-width: 576px)": {
                  minHeight: 720,
                },
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
            styles: (theme, params: ButtonStylesParams) => ({
              root: {
                color: theme.colors.black[6],
                height: 50,
                padding: "0 22px",
                transition: "background 200ms",
                "&[data-disabled]": {
                  backgroundColor:
                    params.color &&
                    theme.fn.lighten(theme.colors[params.color][6], 0.5),
                  color: theme.colors["darker-grey"][6],
                },
                "&:hover:not([data-disabled])": {
                  backgroundColor:
                    params.color &&
                    theme.fn.darken(theme.colors[params.color][6], 0.1),
                },
                "&:active:not([data-disabled])": {
                  backgroundColor:
                    params.color &&
                    theme.fn.darken(theme.colors[params.color][6], 0.2),
                },
              },
            }),
          },
          Modal: {
            styles: (theme) => ({
              header: {
                fontSize: "1.25rem",
                fontWeight: 700,
              },
              body: {
                fontWeight: 400,
              },
            }),
          },
          Progress: {
            styles: (theme) => ({
              root: {
                height: 40,
              },
            }),
          },
          TextInput: {
            styles: (theme) => ({
              input: {
                backgroundColor: theme.colors["light-grey"][6],
                border: "none",
                height: 50,
                "&::placeholder": {
                  color: theme.colors["darker-grey"][6],
                },
              },
            }),
          },
        },
        fontFamily: "Poppins, sans-serif",
        fontSizes: {
          sm: 12.8,
          md: 16,
        },
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
            li: {
              lineHeight: 1.5,
            },
            ol: {
              counterReset: "item",
              marginBottom: "1.1em",
            },
            "ol > li": {
              counterIncrement: "item",
            },
            "ol ol > li": {
              display: "block",
            },
            "ol ol > li:before": {
              content: 'counters(item, ".") ". "',
            },
            ":not(ol) > ol > li": {
              fontWeight: 600,
            },
            p: {
              margin: 0,
              marginBottom: "1.1em",
              lineHeight: 1.5,
            },
            "p:last-of-type": {
              marginBottom: 0,
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
