import { createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((_theme) => ({
  container: {
    height: "100%",
    width: "100%",
    background: "linear-gradient(222.19deg, #F0F0F0 23.77%, #FFFFFF 98.02%)",
  },
}));

type Props = React.PropsWithChildren<{}>;

export default function Background(props: Props) {
  const { classes } = useStyles();
  return <div className={classes.container}>{props.children}</div>;
}
