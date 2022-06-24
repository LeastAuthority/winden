import { Group, Skeleton, Text } from "@mantine/core";
import React from "react";
import { File } from "tabler-icons-react";
import { useWormhole } from "../hooks/useWormhole";
import { sizeToClosestUnit } from "../util/sizeToClosestUnit";

type ContentProps = { name: string; size: number };

export function FileLabelContent(props: ContentProps) {
  return props.name && props.size ? (
    <Group align="center">
      <File />
      <Text component="span" weight="bold" color="dimmed">
        {props.name}
      </Text>
      <Text component="span" color="dimmed">
        {" "}
        ({sizeToClosestUnit(props.size)})
      </Text>
    </Group>
  ) : (
    <Group align="center">
      <File />
      <Skeleton width={100} height={16} />
      <Skeleton width={50} height={16} />
    </Group>
  );
}

type Props = {};

export default function FileLabel({}: Props) {
  const wormhole = useWormhole();
  return (
    <FileLabelContent
      name={wormhole?.fileMeta?.name}
      size={wormhole?.fileMeta?.size}
    />
  );
}
