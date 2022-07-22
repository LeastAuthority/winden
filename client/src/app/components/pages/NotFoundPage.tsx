import { Button, Stack, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { useCommonStyles } from "../../hooks/useCommonStyles";
import Content from "../Content";

type Props = {};

export default function NotFoundPage({}: Props) {
  const { classes } = useCommonStyles();

  return (
    <Content>
      <div data-testid="not-found-page-container">
        <Stack align="center">
          <Text className={classes.headerText}>Page not found</Text>
          <Link data-testid="not-found-page-back-button" to="s">
            <Button className={classes.secondary}>Back to home</Button>
          </Link>
        </Stack>
      </div>
    </Content>
  );
}
