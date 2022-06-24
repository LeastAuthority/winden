import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FileLabelContent } from "../app/components/FileLabel";

export default {
  title: "FileLabel",
  component: FileLabelContent,
} as ComponentMeta<typeof FileLabelContent>;

const Template: ComponentStory<typeof FileLabelContent> = (args) => (
  <FileLabelContent {...args} />
);

export const HasFile = Template.bind({});
HasFile.args = {
  name: "file.txt",
  size: 12345,
};

export const NoFile = Template.bind({});
NoFile.args = {
  name: undefined,
  size: undefined,
};
