import { Button, Progress, Space, Stack, Text } from "@mantine/core";
import React from "react";
import { X } from "tabler-icons-react";
import { useCommonStyles } from "../../hooks/useCommonStyles";
import { useWormhole } from "../../hooks/useWormhole";
import { durationToClosestUnit } from "../../util/durationToClosestUnit";
import Content from "../Content";
import FileLabel from "../FileLabel";

type ContentProps = {
  title: string;
  waitText: string;
  bytesSent: number;
  fileSize: number;
  eta: number;
  onCancel: () => void;
};

export function ProgressScreenContent(props: ContentProps) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <Text component="h1" className={classes.headerText}>
        {props.title}
      </Text>
      <Space h="md" />
      <Stack align="center" spacing={30}>
        <FileLabel />
        <Progress
          style={{ width: "100%" }}
          size={32}
          value={(props.bytesSent / props.fileSize) * 100}
          color="progress-grey"
        />
        <Text size={14.4} weight={400} color="dark-grey">
          {props.eta > 1 ? durationToClosestUnit(props.eta) : props.waitText}
        </Text>
        <Button
          leftIcon={<X />}
          data-testid="send-page-cancel-button"
          onClick={props.onCancel}
          color="medium-grey"
        >
          Cancel
        </Button>
      </Stack>
    </Content>
  );
}

type Props = {
  title: string;
  waitText: string;
  onCancel: () => void;
};

export default function ProgressScreen(props: Props) {
  const wormhole = useWormhole();

  return wormhole && wormhole.fileMeta && wormhole.progressEta ? (
    <ProgressScreenContent
      title={props.title}
      waitText={props.waitText}
      bytesSent={wormhole.bytesSent}
      fileSize={wormhole.fileMeta.size}
      eta={wormhole.progressEta}
      onCancel={props.onCancel}
    />
  ) : null;
}
