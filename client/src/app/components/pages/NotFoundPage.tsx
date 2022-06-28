import { Button, Center, Stack, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function NotFoundPage({}: Props) {
  return (
    <div data-testid="not-found-page-container">
      <Stack align="center">
        <Title order={1}>Page not found</Title>
        <Link data-testid="not-found-page-back-button" to="s">
          <Button variant="light" color="dark">
            Back to home
          </Button>
        </Link>
      </Stack>
    </div>
  );
}
