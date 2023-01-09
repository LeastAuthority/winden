import {
  ButtonStylesParams,
  Global,
  MantineProvider,
  Tuple,
} from "@mantine/core";
import React from "react";
import { PROGRESS_BAR_MS_PER_UPDATES } from "../../util/constants";

function sameShade(color: string) {
  return Array(10).fill(color) as Tuple<string, 10>;
}

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider(props: Props) {
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        primaryColor: "tertiary",
        components: {
          TypographyStylesProvider: {
            styles: (theme, params: ButtonStylesParams) => ({
              root: {
                // override shrinking font on small screens
                "@media (max-width: 755px)": {
                  fontSize: theme.fontSizes.md,
                  h1: {
                    fontSize: "1.35rem",
                  },
                  h2: {
                    fontSize: "1.25rem",
                  },
                  h3: {
                    fontSize: "1.15rem",
                  },
                },
                h3: {
                  fontWeight: 400,
                },
                "h2:after": {
                  content: "' '",
                  display: "block",
                  borderTop: `1px dashed #868e96`,
                },
                "b, strong": {
                  fontWeight: 600,
                },
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
              bar: {
                transition: `width ${PROGRESS_BAR_MS_PER_UPDATES}ms linear 0s`,
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
          Notification: {
            styles: (theme) => ({
              root: {
                boxShadow: "none",
                border: "1px solid #dee2e6",
              },
            }),
          },
        },
        headings: {
          fontFamily: "Poppins, sans-serif",
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
            ".content a, .mantine-Modal-root a": {
              color: "#9d44b5",
            },
            li: {
              lineHeight: 1.5,
            },
            ol: {
              listStyleType: "none",
              counterReset: "item",
              margin: "0",
              padding: "0",
              marginBottom: "1.1em",
              paddingLeft: "0 !important",
            },
            "ol > li": {
              display: "table",
              counterIncrement: "item",
            },
            "ol > li:before": {
              content: 'counters(item, ".") ". "',
              display: "table-cell",
              paddingRight: "0.6em",
            },
            "li ol > li": {
              margin: "0",
            },
            "li ol > li:before": {
              content: 'counters(item, ".") " "',
            },
            p: {
              margin: 0,
              marginBottom: "1.1em",
              lineHeight: 1.5,
            },
            "p:last-of-type": {
              marginBottom: 0,
            },
            ".target-highlight": {
              backgroundColor: "#ffa",
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
