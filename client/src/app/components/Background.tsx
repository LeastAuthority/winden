import { createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((_theme) => ({
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
}));

type Props = {};

export default function Background({}: Props) {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.circle}></div>
    </div>
  );
}
