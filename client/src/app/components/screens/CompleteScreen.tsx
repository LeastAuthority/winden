import { Box, Stack, Title } from "@mantine/core";
import React from "react";
import FileLabel from "../FileLabel";

type Props = {
  title: string;
  render: () => React.ReactElement;
};

export default function CompleteScreen(props: Props) {
  return (
    <>
      <Title order={1}>{props.title}</Title>
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
    </>
  );
}
