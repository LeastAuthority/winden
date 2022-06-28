import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
import ReceiveProgressScreen from "../../../app/components/screens/receive/ReceiveProgressScreen";

export default {
  title: "screens/ReceiveProgressScreen",
  component: ReceiveProgressScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceiveProgressScreen>;

const Template: ComponentStory<typeof ReceiveProgressScreen> = (args) => (
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
        <ReceiveProgressScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
