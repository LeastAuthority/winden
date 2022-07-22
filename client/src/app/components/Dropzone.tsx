import { createStyles, Divider, Text } from "@mantine/core";
import classNames from "classnames";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Plus } from "tabler-icons-react";
import { useCommonStyles } from "../hooks/useCommonStyles";

const useStyles = createStyles((theme) => ({
  dropzoneButton: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 135,
    height: 135,
    borderRadius: 4,
    "&:active": {
      transform: "translateY(1px)",
    },
  },
  dropzoneDivider: {
    width: "25%",
  },
  dropzone: {
    backgroundColor: theme.other.colors["light-grey"],
    border: `4px dashed ${theme.other.colors["dark-grey"]}`,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    margin: -24,
    "@media (max-width: 620px)": {
      margin: -16,
    },
    "@media (max-width: 500px)": {
      margin: -8,
    },
    marginTop: 0,
    flex: 1,
  },
}));

type Props = {
  onDrop: (files: File[]) => void;
  onReject: (rejections: FileRejection[]) => void;
};

export default function Dropzone(props: Props) {
  const { classes: commonClasses } = useCommonStyles();
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
      <Text className={commonClasses.grey} weight={600}>
        Drag & drop any file
      </Text>
      <Text className={commonClasses.grey}>up to 4GB</Text>
      <Divider
        className={classes.dropzoneDivider}
        my="xs"
        label="or"
        labelPosition="center"
      />
      <div
        role="button"
        onClick={open}
        className={classNames(classes.dropzoneButton, commonClasses.secondary)}
      >
        <Plus size={70} />
        <Text>Select</Text>
      </div>
    </div>
  );
}
