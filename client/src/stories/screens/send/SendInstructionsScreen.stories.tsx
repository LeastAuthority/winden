import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { SendInstructionsScreenContent } from "../../../app/components/screens/send/SendInstructionsScreen";

export default {
  title: "screens/SendInstructionsScreen",
  component: SendInstructionsScreenContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SendInstructionsScreenContent>;

const Template: ComponentStory<typeof SendInstructionsScreenContent> = (
  args
) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <SendInstructionsScreenContent {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  code: "7-guitarist-revenge",
  copied: false,
  onCopy: () => console.log("onCopy"),
  onCancel: () => console.log("onCancel"),
};
