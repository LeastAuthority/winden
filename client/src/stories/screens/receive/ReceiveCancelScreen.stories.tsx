import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
import ReceiveCancelScreen from "../../../app/components/screens/receive/ReceiveCancelScreen";

export default {
  title: "screens/receive/ReceiveCancelScreen",
  component: ReceiveCancelScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceiveCancelScreen>;

const Template: ComponentStory<typeof ReceiveCancelScreen> = (args) => (
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
        <ReceiveCancelScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
