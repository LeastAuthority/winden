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
      <Space h="md" />
      <Stack align="center">
        <Text
          weight="bold"
          color="dark-grey"
          align="center"
          className={classes.textLine}
        >
          The sender has cancelled this transfer.
        </Text>

        <Text color="dark-grey" align="center" className={classes.textLine}>
          You can try again with a new link/code.
        </Text>
        {props.render()}
      </Stack>
    </Content>
  );
}
