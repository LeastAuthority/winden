import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import NotFoundScreen from "../app/components/screens/NotFoundScreen";

export default {
  title: "screens/NotFoundScreen",
  component: NotFoundScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof NotFoundScreen>;

const Template: ComponentStory<typeof NotFoundScreen> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <NotFoundScreen {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
