import { Text } from "@mantine/core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate, { Content } from "../app/components/AppTemplate";

export default {
  title: "Content",
  component: Content,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AppTemplate>;

const Template: ComponentStory<typeof AppTemplate> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <div
      style={{ minHeight: "100vh", padding: 32, backgroundColor: "#999999" }}
    >
      <Content>
        <Text>Content example</Text>
      </Content>
    </div>
  </MemoryRouter>
);

export const Story = Template.bind({});
