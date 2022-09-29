import { createStyles } from "@mantine/core";

export const useCommonStyles = createStyles((theme) => {
  return {
    headerText: {
      fontSize: "2.5rem",
      marginBottom: "1.1rem",
      fontWeight: 700,
      color: theme.colors.black,
      lineHeight: 1,
      "@media (max-width: 620px)": {
        fontSize: "2rem",
      },
      "@media (max-width: 500px)": {
        fontSize: "1.35rem",
      },
    },
  };
});
