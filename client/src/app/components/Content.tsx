import { createStyles, Paper } from "@mantine/core";
import classnames from "classnames";
import React from "react";
import { ContentProps } from "./AppTemplate";

const useStyles = createStyles((_theme) => ({
  content: {
    gridRow: 1,
    gridColumn: 1,
    width: "100%",
    padding: 40,
    "@media (max-width: 620px)": {
      padding: 30,
    },
    "@media (max-width: 500px)": {
      padding: 20,
    },
  },
  contentFullHeight: {
    height: "100%",
  },
}));

export default function Content(props: ContentProps) {
  const { classes } = useStyles();

  return (
    <Paper
      className={classnames(classes.content, {
        [classes.contentFullHeight]: props.fullHeight,
      })}
      withBorder
      radius={10}
    >
      {props.children}
    </Paper>
  );
}
