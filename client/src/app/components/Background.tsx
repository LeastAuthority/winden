import React from "react";
import styles from "./Background.module.css";

type Props = {};

export default function Background({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
    </div>
  );
}
