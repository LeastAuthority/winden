import { Button, Progress, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "tabler-icons-react";
import { useWormhole } from "../../hooks/useWormhole";
import { durationToClosestUnit } from "../../util/durationToClosestUnit";
import FileLabel from "../FileLabel";

type ContentProps = {
  title: string;
  waitText: string;
  bytesSent: number;
  fileSize: number;
  eta: number;
  onCancel: () => void;
};

// make generic with text props
export function ProgressScreenContent(props: ContentProps) {
  return (
    <>
      <Title order={1}>{props.title}</Title>
      <Stack align="center">
        <FileLabel />
        <Progress
          style={{ width: "100%" }}
          size="xl"
          value={(props.bytesSent / props.fileSize) * 100}
        />
        <Text>
          {props.eta > 1 ? durationToClosestUnit(props.eta) : props.waitText}
        </Text>
        <Button data-testid="send-page-cancel-button" onClick={props.onCancel}>
          <X /> Cancel
        </Button>
      </Stack>
    </>
  );
}

type Props = {
  title: string;
  waitText: string;
};

export default function ProgressScreen(props: Props) {
  const wormhole = useWormhole();
  const navigate = useNavigate();

  return (
    wormhole &&
    wormhole.fileMeta &&
    wormhole.progressEta && (
      <ProgressScreenContent
        title={props.title}
        waitText={props.waitText}
        bytesSent={wormhole.bytesSent}
        fileSize={wormhole.fileMeta.size}
        eta={wormhole.progressEta}
        onCancel={() => {
          navigate("/s", { replace: true });
          window.location.reload();
        }}
      />
    )
  );
}
