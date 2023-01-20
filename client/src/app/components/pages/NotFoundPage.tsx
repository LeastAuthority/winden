import { Button, Stack, Text } from "@mantine/core";
import React from "react";
import { useCommonStyles } from "../../hooks/useCommonStyles";
import Content from "../Content";
import Link from "../Link";

type Props = {};

export default function NotFoundPage({}: Props) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <div data-testid="not-found-page-container">
        <Stack align="center">
          <Text component="h1" className={classes.headerText}>
            Page not found
          </Text>
          <Link data-testid="not-found-page-back-button" to="s">
            <Button color="medium-grey">Back to home</Button>
          </Link>
        </Stack>
      </div>
    </Content>
  );
}
