import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../app/components/Navbar";

export default {
  title: "Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <Navbar {...args} />
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
