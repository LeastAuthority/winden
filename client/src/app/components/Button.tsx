import classnames from "classnames";
import React from "react";
import styles from "./Button.module.css";

type Props = React.HTMLProps<HTMLSpanElement>;

export default function Button(props: Props) {
  return (
    <span
      {...props}
      className={classnames(styles.button, props.className)}
      role="button"
    >
      {props.children}
    </span>
  );
}
