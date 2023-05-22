import { Space, Text } from "@mantine/core";
import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { NoSleep } from "../../../NoSleep";
import { requestTransfer, setTransferProgress } from "../../../wormholeSlice";
import CodeInput from "../../CodeInput";
import Content from "../../Content";

type ContentProps = {
  onSubmit: (code: string) => void;
};

export function ReceiveBeginScreenContent(props: ContentProps) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <div data-testid="receive-page-container">
        <Text component="h1" className={classes.headerText} weight={300}>
          Receive files in real-time
        </Text>
        <Text component="p" color="dark-grey" weight={400}>
          Always end-to-end encrypted.
        </Text>
        <Space h={40} />
        <CodeInput onSubmit={props.onSubmit} />
      </div>
    </Content>
  );
}

type Props = {};

export default function ReceiveBeginScreen({}: Props) {
  const dispatch = useAppDispatch();

  return (
    <ReceiveBeginScreenContent
      onSubmit={(code) => {
        NoSleep.enable();

        dispatch(
          requestTransfer({
            type: "receive",
            code,
          })
        );
      }}
    />
  );
}
