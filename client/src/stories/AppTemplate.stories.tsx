import { Text } from "@mantine/core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";

export default {
  title: "AppTemplate",
  component: AppTemplate,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AppTemplate>;

const Template: ComponentStory<typeof AppTemplate> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <Text>
        Components inside the <code>{"<AppTemplate />"}</code> component will be
        rendered in this white area.
      </Text>
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
