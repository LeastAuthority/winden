import { createStyles, Paper } from "@mantine/core";
import React from "react";
import { ContentProps } from "./AppTemplate";

const useStyles = createStyles((_theme) => ({
  content: {
    padding: 40,
    "@media (max-width: 620px)": {
      padding: 30,
    },
    "@media (max-width: 500px)": {
      padding: 20,
    },
  },
}));

export default function Content(props: ContentProps) {
  const { classes } = useStyles();

  return (
    <div
      style={{
        gridRow: 1,
        gridColumn: 1,
      }}
    >
      <Paper
        className={classes.content}
        style={props.fullHeight ? { height: "100%" } : {}}
        withBorder
        radius={10}
      >
        {props.children}
      </Paper>
    </div>
  );
}
