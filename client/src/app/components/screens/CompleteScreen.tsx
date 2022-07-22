import { Box, Space, Stack, Text } from "@mantine/core";
import React from "react";
import { useCommonStyles } from "../../hooks/useCommonStyles";
import Content from "../Content";
import FileLabel from "../FileLabel";

type Props = {
  title: string;
  render: () => React.ReactElement;
};

export default function CompleteScreen(props: Props) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <Text className={classes.headerText}>{props.title}</Text>
      <Space h="md" />
      <Stack align="center">
        <FileLabel />
        <Box
          sx={(_theme) => ({
            fontSize: 60,
          })}
        >
          🎉
        </Box>
        {props.render()}
      </Stack>
    </Content>
  );
}
