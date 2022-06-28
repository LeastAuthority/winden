import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../app/components/AppTemplate";
import { ReceiveConsentScreenContent } from "../app/components/screens/receive/ReceiveConsentScreen";

export default {
  title: "screens/ReceiveConsentScreen",
  component: ReceiveConsentScreenContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceiveConsentScreenContent>;

const Template: ComponentStory<typeof ReceiveConsentScreenContent> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <AppTemplate>
      <ReceiveConsentScreenContent {...args} />
    </AppTemplate>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  onAccept: () => console.log("onAccept"),
  onCancel: () => console.log("onCancel"),
};
