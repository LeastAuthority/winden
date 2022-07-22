import { Divider, Text } from "@mantine/core";
import classNames from "classnames";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Plus } from "tabler-icons-react";
import { useStyles } from "../hooks/useStyles";

type Props = {
  onDrop: (files: File[]) => void;
  onReject: (rejections: FileRejection[]) => void;
};

export default function Dropzone(props: Props) {
  const { classes } = useStyles();

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: process.env.NODE_ENV === "production" ? 2 * 10 ** 8 : undefined,
    onDropAccepted: props.onDrop,
    onDropRejected: props.onReject,
  });

  return (
    <div
      {...getRootProps({
        className: classNames(classes.dropzone),
      })}
    >
      <input {...getInputProps()} />
      <Text className={classes.grey} weight={600}>
        Drag & drop any file
      </Text>
      <Text className={classes.grey}>up to 4GB</Text>
      <Divider
        className={classes.dropzoneDivider}
        my="xs"
        label="or"
        labelPosition="center"
      />
      <div
        role="button"
        onClick={open}
        className={classNames(classes.dropzoneButton, classes.secondary)}
      >
        <Plus size={70} />
        <Text>Select</Text>
      </div>
    </div>
  );
}
