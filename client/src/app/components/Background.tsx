import React from "react";
import { useStyles } from "../hooks/useStyles";

type Props = {};

export default function Background({}: Props) {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.circle}></div>
    </div>
  );
}
