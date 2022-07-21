import { MantineThemeOther } from "@mantine/core";

declare module "@mantine/core" {
  interface MantineThemeOther {
    colors: {
      black: string;
      "darker-grey": string;
      "dark-grey": string;
      "progress-grey": string;
      "medium-grey": string;
      "light-grey": string;
      tertiary: string;
      yellow: string;
      blue: string;
      "warning-red": string;
    };
  }
}
