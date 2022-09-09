import {
  Button,
  createStyles,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classNames from "classnames";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Plus } from "tabler-icons-react";

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
    backgroundColor: theme.colors["light-grey"][6],
    display: "flex",
    padding: 32,
    flex: 1,
    position: "relative",
  },
  dropzoneLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dropzoneLayerTop: {
    backgroundColor: theme.colors["tertiary"][6],
    opacity: 0,
    transition: "opacity 0.2s",
    height: 0,
    visibility: "hidden",
  },
  dropzoneLayerTopVisible: {
    opacity: 0.8,
    display: "flex",
    height: "auto",
    visibility: "visible",
  },
  dropzoneLayerBottom: {
    border: `4px dashed ${theme.colors["dark-grey"][6]}`,
  },
}));

type Props = {
  onDrop: (files: File[]) => void;
  onReject: (rejections: FileRejection[]) => void;
};

export default function Dropzone(props: Props) {
  const { classes } = useStyles();
  const isNarrowScreen = useMediaQuery("(max-width: 575px)");

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: process.env.NODE_ENV === "production" ? 2 * 10 ** 8 : undefined,
    onDropAccepted: props.onDrop,
    onDropRejected: props.onReject,
  });

  const button = (
    <Group position="center">
      <Button
        onClick={open}
        className={classNames(classes.dropzoneButton)}
        color="tertiary"
      >
        <Stack spacing={0}>
          <Text align="center">
            <Plus size={70} />
          </Text>
          <Text size={14.4} align="center">
            {isNarrowScreen ? "Select a file" : "Select"}
          </Text>
        </Stack>
      </Button>
    </Group>
  );

  return (
    <div
      {...getRootProps({
        className: classNames({ [classes.dropzone]: !isNarrowScreen }),
      })}
    >
      <input {...getInputProps()} />
      {isNarrowScreen ? (
        button
      ) : (
        <>
          <div
            className={classNames(
              classes.dropzoneLayer,
              classes.dropzoneLayerBottom
            )}
          >
            <Text color="dark-grey" weight={600}>
              Drag & drop any file
            </Text>
            <Text color="dark-grey">up to 4GB</Text>
            <Divider
              className={classes.dropzoneDivider}
              my="xs"
              label="or"
              labelPosition="center"
            />
            {button}
          </div>
          <div
            className={classNames(
              classes.dropzoneLayer,
              classes.dropzoneLayerTop,
              {
                [classes.dropzoneLayerTopVisible]: isDragActive,
              }
            )}
          >
            <Text size={40}>Drop file here</Text>
          </div>
        </>
      )}
    </div>
  );
}
