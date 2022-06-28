import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import SendProgressScreen from "../app/components/screens/send/SendProgressScreen";

export default {
  title: "screens/SendProgressScreen",
  component: SendProgressScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SendProgressScreen>;

const Template: ComponentStory<typeof SendProgressScreen> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <SendProgressScreen {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
