import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import SendCompleteScreen from "../../../app/components/screens/send/SendCompleteScreen";

export default {
  title: "screens/SendCompleteScreen",
  component: SendCompleteScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SendCompleteScreen>;

const Template: ComponentStory<typeof SendCompleteScreen> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <SendCompleteScreen {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
