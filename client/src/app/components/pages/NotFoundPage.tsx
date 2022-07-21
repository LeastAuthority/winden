import { Button, Stack, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../../hooks/useStyles";
import { Content } from "../AppTemplate";

type Props = {};

export default function NotFoundPage({}: Props) {
  const { classes } = useStyles();

  return (
    <Content>
      <div data-testid="not-found-page-container">
        <Stack align="center">
          <Text className={classes.headerText}>Page not found</Text>
          <Link data-testid="not-found-page-back-button" to="s">
            <Button variant="light" color="dark">
              Back to home
            </Button>
          </Link>
        </Stack>
      </div>
    </Content>
  );
}
