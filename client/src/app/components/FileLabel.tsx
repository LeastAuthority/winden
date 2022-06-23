import { Group, Skeleton, Text, ThemeIcon } from "@mantine/core";
import React from "react";
import { File } from "tabler-icons-react";
import { useWormhole } from "../hooks/useWormhole";
import { sizeToClosestUnit } from "../util/sizeToClosestUnit";

type Props = {};

export default function FileLabel({}: Props) {
  const wormhole = useWormhole();
  return wormhole?.fileMeta ? (
    <Group align="center">
      <ThemeIcon variant="outline" color="gray">
        <File />
      </ThemeIcon>
      <Text component="span" weight="bold" color="dimmed">
        {wormhole?.fileMeta.name}
      </Text>
      <Text component="span" color="dimmed">
        {" "}
        ({sizeToClosestUnit(wormhole.fileMeta.size)})
      </Text>
    </Group>
  ) : (
    <Skeleton />
  );
}
