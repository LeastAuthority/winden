import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import SendBeginScreen from "../app/components/screens/send/SendBeginScreen";

export default {
  title: "screens/SendBeginScreen",
  component: SendBeginScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SendBeginScreen>;

const Template: ComponentStory<typeof SendBeginScreen> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <SendBeginScreen {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
