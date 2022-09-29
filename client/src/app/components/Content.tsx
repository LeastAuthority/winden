import { createStyles, Paper } from "@mantine/core";
import classnames from "classnames";
import React, { CSSProperties } from "react";

const useStyles = createStyles((_theme) => ({
  container: {
    gridRow: 1,
    gridColumn: 1,
  },
  content: {
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

type Props = React.PropsWithChildren<{
  fullHeight?: boolean;
  styles?: {
    root?: CSSProperties;
    paper?: CSSProperties;
  };
}>;

export default function Content(props: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.container} style={props.styles?.root}>
      <Paper
        style={props.styles?.paper}
        className={classnames(classes.content, {
          [classes.contentFullHeight]: props.fullHeight,
        })}
        withBorder
        radius={10}
      >
        {props.children}
      </Paper>
    </div>
  );
}
