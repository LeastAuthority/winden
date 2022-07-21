import { Box, Space, Stack, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "../../hooks/useStyles";
import { Content } from "../AppTemplate";
import FileLabel from "../FileLabel";

type Props = {
  title: string;
  render: () => React.ReactElement;
};

export default function CompleteScreen(props: Props) {
  const { classes } = useStyles();

  return (
    <Content>
      <Text className={classes.headerText}>{props.title}</Text>
      <Space h="md" />
      <Stack align="center">
        <FileLabel />
        <Box
          sx={(theme) => ({
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
