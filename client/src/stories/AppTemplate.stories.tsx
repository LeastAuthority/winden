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
      <div>
        Components inside the <code>{"<AppTemplate />"}</code> component will be
        rendered in this white area.
      </div>
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
