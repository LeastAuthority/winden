import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import { ReceiveBeginScreenContent } from "../app/components/screens/receive/ReceiveBeginScreen";

export default {
  title: "screens/ReceiveBeginScreen",
  component: ReceiveBeginScreenContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceiveBeginScreenContent>;

const Template: ComponentStory<typeof ReceiveBeginScreenContent> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <ReceiveBeginScreenContent {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  cancelModalOpen: false,
  onCancelModalClose: () => console.log("onCancelModalClose"),
  onSubmit: () => console.log("onSubmit"),
};
