import { Anchor, Button, Stack, Text } from "@mantine/core";
import React from "react";
import { Download, X } from "tabler-icons-react";
import { useAppDispatch } from "../../../hooks/redux";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { NoSleep } from "../../../NoSleep";
import { answerConsent } from "../../../wormholeSlice";
import Content from "../../Content";
import FileLabel from "../../FileLabel";

type ContentProps = {
  submitting: boolean;
  onAccept: () => void;
  onCancel: () => void;
};

export function ReceiveConsentScreenContent(props: ContentProps) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <Text component="h1" className={classes.headerText}>
        Ready to download
      </Text>
      <Stack align="center" spacing={30}>
        <FileLabel />
        <Button
          leftIcon={<Download />}
          data-testid="receive-download-button"
          onClick={props.onAccept}
          color="yellow"
          loading={props.submitting}
        >
          Download
        </Button>
        <Text color="dark-grey" weight={400} size={14.4}>
          By using Winden you agree to the{" "}
          <Anchor
            href="/terms"
            color="tertiary"
            weight={600}
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </Anchor>
          .
        </Text>
        <Button
          leftIcon={<X />}
          data-testid="send-page-cancel-button"
          onClick={props.onCancel}
          color="medium-grey"
        >
          Cancel
        </Button>
      </Stack>
    </Content>
  );
}

type Props = {};

export default function ReceiveConsentScreen({}: Props) {
  const dispatch = useAppDispatch();

  return (
    <ReceiveConsentScreenContent
      submitting={false} // TODO: add a requested status
      onAccept={() => {
        NoSleep.enable();
        dispatch(answerConsent(true));
      }}
      onCancel={() => {
        dispatch(answerConsent(false));
      }}
    />
  );
}
