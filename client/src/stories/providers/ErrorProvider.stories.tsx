import { Button, Group } from "@mantine/core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../app/components/AppTemplate";
import Content from "../../app/components/Content";
import ErrorProvider from "../../app/components/providers/ErrorProvider";
import { useError } from "../../app/hooks/useError";
import { ErrorTypes } from "../../app/util/errors";

function ErrorProviderExample() {
  const error = useError();

  function showError() {
    error?.setError(ErrorTypes.RECV_CONNECTION_TIMEOUT);
  }

  return (
    <Group position="center">
      <Button onClick={showError}>Show error</Button>
    </Group>
  );
}

export default {
  title: "ErrorProvider",
  component: ErrorProvider,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ErrorProvider>;

const Template: ComponentStory<typeof ErrorProvider> = (args) => (
  <ErrorProvider>
    <MemoryRouter initialEntries={["/"]}>
      <AppTemplate>
        <Content>
          <ErrorProviderExample />
        </Content>
      </AppTemplate>
    </MemoryRouter>
  </ErrorProvider>
);

export const Story = Template.bind({});
