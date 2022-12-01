import { Anchor, Button, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, X } from "tabler-icons-react";
import { useCommonStyles } from "../../../hooks/useCommonStyles";
import { useError } from "../../../hooks/useError";
import { detectErrorType } from "../../../util/errors";
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
      <Text className={classes.headerText}>Ready to download</Text>
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
          <Anchor component={Link} to="/terms" color="tertiary" weight={600}>
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

type Props = {
  accept: () => Promise<void>;
};

export default function ReceiveConsentScreen(props: Props) {
  const error = useError();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  return (
    <ReceiveConsentScreenContent
      submitting={submitting}
      onAccept={() => {
        setSubmitting(true);
        props
          .accept()
          .catch((e: any) => {
            if (e.includes("unexpected EOF")) {
              navigate("/r?cancel=", { replace: true });
              window.location.reload();
            } else {
              error?.setError(detectErrorType(e));
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
      onCancel={() => {
        navigate("/r", { replace: true });
        window.location.reload();
      }}
    />
  );
}
