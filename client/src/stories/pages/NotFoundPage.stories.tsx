import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../app/components/AppTemplate";
import NotFoundPage from "../../app/components/pages/NotFoundPage";

export default {
  title: "pages/NotFoundPage",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <NotFoundPage {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
