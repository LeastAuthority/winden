import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import { ProgressScreenContent } from "../app/components/screens/ProgressScreen";

export default {
  title: "screens/ProgressScreenContent",
  component: ProgressScreenContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ProgressScreenContent>;

const Template: ComponentStory<typeof ProgressScreenContent> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <ProgressScreenContent {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Incomplete = Template.bind({});
Incomplete.args = {
  title: "Sending...",
  waitText: "Waiting for receiver to complete transfer...",
  bytesSent: 50,
  fileSize: 100,
  eta: 5,
  onCancel: () => console.log("onCancel"),
};

export const AlmostDone = Template.bind({});
AlmostDone.args = {
  ...Incomplete.args,
  bytesSent: 100,
  eta: 1,
};
