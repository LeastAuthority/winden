import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
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
}));
