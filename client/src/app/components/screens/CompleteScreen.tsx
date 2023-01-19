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
      <Text component="h1" className={classes.headerText}>
        {props.title}
      </Text>
      <Stack align="center" spacing={30}>
        <FileLabel />
        <Box
          sx={(_theme) => ({
            fontSize: 80,
          })}
        >
          🎉
        </Box>
        {props.render()}
      </Stack>
    </Content>
  );
}
