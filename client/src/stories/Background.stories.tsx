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

export const Story: ComponentStory<typeof Background> = () => <Background />;
