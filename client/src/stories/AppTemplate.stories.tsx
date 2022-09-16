import { Text } from "@mantine/core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import Content from "../app/components/Content";

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
      <Content>
        <Text>
          Components inside the <code>{"<AppTemplate />"}</code> component will
          be rendered here. Use with <code>{"<Content />"}</code> if you want
          the content in a card.
        </Text>
      </Content>
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
