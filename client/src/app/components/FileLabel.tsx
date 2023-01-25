import { Group, Paper, Skeleton, Text } from "@mantine/core";
import React from "react";
import { File } from "tabler-icons-react";
import { useAppSelector } from "../hooks/redux";
import { useCommonStyles } from "../hooks/useCommonStyles";
import { sizeToClosestUnit } from "../util/sizeToClosestUnit";
import { selectWormholeFile } from "../wormholeSlice";

type ContentProps = { name: string; size: number };

export function FileLabelContent(props: ContentProps) {
  const { classes } = useCommonStyles();

  return (
    <Paper p="md" withBorder>
      {props.name && props.size ? (
        <Group align="center" spacing="xs">
          <File />
          <Text component="span" size="sm" weight={600} color="dark-grey">
            {props.name}
          </Text>
          <Text component="span" size="sm" weight={400} color="dark-grey">
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
      )}
    </Paper>
  );
}

type Props = {};

export default function FileLabel({}: Props) {
  const wormholeFile = useAppSelector(selectWormholeFile);

  return (
    wormholeFile && (
      <FileLabelContent name={wormholeFile.name} size={wormholeFile.size} />
    )
  );
}
