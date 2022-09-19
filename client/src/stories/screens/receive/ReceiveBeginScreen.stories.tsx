import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import CodeInputProvider from "../../../app/components/providers/CodeInputProvider";
import { ReceiveBeginScreenContent } from "../../../app/components/screens/receive/ReceiveBeginScreen";

export default {
  title: "screens/receive/ReceiveBeginScreen",
  component: ReceiveBeginScreenContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceiveBeginScreenContent>;

const Template: ComponentStory<typeof ReceiveBeginScreenContent> = (args) => (
  <CodeInputProvider>
    <MemoryRouter initialEntries={["/"]}>
      <AppTemplate>
        <ReceiveBeginScreenContent {...args} />
      </AppTemplate>
    </MemoryRouter>
  </CodeInputProvider>
);

export const Story = Template.bind({});
Story.args = {
  onSubmit: () => console.log("onSubmit"),
  submitting: false,
};
