import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Background from "../app/components/Background";

export default {
  title: "Background",
  component: Background,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Background>;

const Template: ComponentStory<typeof Background> = (args) => (
  <Background {...args} />
);

export const Story = Template.bind({});
Story.args = {};
