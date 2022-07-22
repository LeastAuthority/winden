import { createStyles } from "@mantine/core";

export const useCommonStyles = createStyles((theme) => {
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
  };
});
