import { Space, Stack, Text } from "@mantine/core";
import React from "react";
import { useCommonStyles } from "../../hooks/useCommonStyles";
import Content from "../Content";

type Props = {
  render: () => React.ReactElement;
};

export default function CancelScreen(props: Props) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <Text className={classes.headerText}>So close...</Text>
      <Stack spacing={30} align="center">
        <div>
          <Text component="p" weight="bold" color="dark-grey" align="center">
            The sender has cancelled this transfer.
          </Text>

          <Text component="p" color="dark-grey" align="center">
            You can try again with a new link/code.
          </Text>
        </div>
        {props.render()}
      </Stack>
    </Content>
  );
}
