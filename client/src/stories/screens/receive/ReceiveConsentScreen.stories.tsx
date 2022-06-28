import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
import { ReceiveConsentScreenContent } from "../../../app/components/screens/receive/ReceiveConsentScreen";

export default {
  title: "screens/receive/ReceiveConsentScreen",
  component: ReceiveConsentScreenContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceiveConsentScreenContent>;

const Template: ComponentStory<typeof ReceiveConsentScreenContent> = (args) => (
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
        <ReceiveConsentScreenContent {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  onAccept: () => console.log("onAccept"),
  onCancel: () => console.log("onCancel"),
};
