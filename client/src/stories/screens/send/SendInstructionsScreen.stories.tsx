import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
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
    <WormholeContext.Provider
      value={
        {
          code: "7-guitarist-revenge",
          fileMeta: { name: "hello-world.txt", size: "123" },
          progressEta: 10,
          bytesSent: 50,
        } as any
      }
    >
      <AppTemplate>
        <SendInstructionsScreenContent {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  code: "7-guitarist-revenge",
  copied: false,
  onCopy: () => console.log("onCopy"),
  onCancel: () => console.log("onCancel"),
};
