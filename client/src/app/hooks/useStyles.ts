import { Center, createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  return {
    dark: {
      color: theme.other.colors.black,
    },
    darkGrey: {
      color: theme.other.colors["darker-grey"],
    },
    grey: {
      color: theme.other.colors["dark-grey"],
    },
    primary: {
      backgroundColor: theme.other.colors.yellow,
      color: theme.other.colors.black,
      "&:hover": {
        backgroundColor: theme.fn.darken(theme.other.colors.yellow, 0.1),
      },
    },
    secondary: {
      color: theme.other.colors.black,
      backgroundColor: theme.other.colors["medium-grey"],
      "&:hover": {
        backgroundColor: theme.fn.darken(
          theme.other.colors["medium-grey"],
          0.1
        ),
      },
    },
    fadeEnter: {
      opacity: 0,
      // transform: "translate(0, 25px)",
      zIndex: 1,
    },
    fadeEnterActive: {
      opacity: 1,
      // transform: "translate(0, 0)",

      transition: "opacity 250ms ease-out, transform 300ms ease",
    },
    fadeExit: {
      opacity: 1,
      // transform: "translate(0, 0)",
    },
    fadeExitActive: {
      opacity: 0,
      // transform: "translate(0, 30px)",

      transition: "opacity 250ms ease-out, transform 300ms ease",
    },
    // itemEnter: {
    //   opacity: 0,
    //   transition: "opacity 300ms ease-in",
    // },
    // itemEnterActive: {
    //   opacity: 1,
    //   transition: "opacity 300ms ease-in",
    // },
    // itemExit: {
    //   opacity: 1,
    //   transition: "opacity 300ms ease-in",
    // },
    // itemExitActive: {
    //   opacity: 0,
    //   transition: "opacity 300ms ease-in",
    // },
    appShell: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    appShellBody: {
      flex: 1,
    },
    dropzoneButton: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: 135,
      height: 135,
      borderRadius: 4,
      "&:active": {
        transform: "translateY(1px)",
      },
    },
    dropzoneDivider: {
      width: "25%",
    },
    dropzone: {
      backgroundColor: theme.other.colors["light-grey"],
      border: `4px dashed ${theme.other.colors["dark-grey"]}`,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      margin: -24,
      "@media (max-width: 620px)": {
        margin: -16,
      },
      "@media (max-width: 500px)": {
        margin: -8,
      },
      marginTop: 0,
    },
    content: {
      // height: "100%",
      padding: 32,
      "@media (max-width: 620px)": {
        padding: 24,
      },
      "@media (max-width: 500px)": {
        padding: 16,
      },
    },
    container: {
      zIndex: -100,
      overflow: "hidden",
      position: "fixed",
      height: "100vh",
      width: "100vw",
    },
    circle: {
      position: "relative",
      clipPath: "circle(45vw)",
      top: "0vw",
      left: "-4vw",
      height: "134vh",
      width: "100vw",
      background: "#9ee6f5",
    },
    logo: {
      fontSize: "2rem",
    },
    sendPageSection: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    headerText: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: theme.other.colors.black,
      "@media (max-width: 620px)": {
        fontSize: "2rem",
      },
      "@media (max-width: 500px)": {
        fontSize: "1.35rem",
      },
    },
    laMadeByTextLarge: {
      [`@media (min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme.breakpoints.md}px)`]:
        {
          display: "none",
        },
    },
    laMadeByTextSmall: {
      [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
        display: "none",
      },
    },
    footerLarge: {
      [`@media (max-width: ${theme.breakpoints.sm - 1}px)`]: {
        display: "none",
      },
    },
    footerSmall: {
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        display: "none",
      },
    },
  };
});
