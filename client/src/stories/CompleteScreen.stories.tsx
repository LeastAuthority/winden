import { Button } from "@mantine/core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import CompleteScreen from "../app/components/screens/CompleteScreen";

export default {
  title: "screens/CompleteScreen",
  component: CompleteScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CompleteScreen>;

const Template: ComponentStory<typeof CompleteScreen> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <CompleteScreen {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  title: "Sending...",
  render: () => <Button>Send/Receive more</Button>,
};
