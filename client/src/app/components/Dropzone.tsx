import { Divider, Text } from "@mantine/core";
import classNames from "classnames";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Plus } from "tabler-icons-react";
import { useStyles } from "../hooks/useStyles";

type Props = React.HTMLProps<HTMLDivElement>;

export default function Dropzone(props: Props) {
  const { classes } = useStyles();

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      {...props}
      {...getRootProps({
        className: classNames(props.className, classes.dropzone),
      })}
    >
      <input {...getInputProps()} />
      <Text color="gray" weight={600}>
        Drag & drop any file
      </Text>
      <Text color="gray">up to 4GB</Text>
      <Divider
        className={classes.dropzoneDivider}
        my="xs"
        label="or"
        labelPosition="center"
      />
      <div role="button" onClick={open} className={classes.dropzoneButton}>
        <Plus size={70} />
        <Text>Select</Text>
      </div>
    </div>
  );
}
