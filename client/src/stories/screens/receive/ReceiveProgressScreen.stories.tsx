import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
import ReceiveCompleteScreen from "../../../app/components/screens/receive/ReceiveCompleteScreen";

export default {
  title: "screens/ReceiveCompleteScreen",
  component: ReceiveCompleteScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceiveCompleteScreen>;

const Template: ComponentStory<typeof ReceiveCompleteScreen> = (args) => (
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
        <ReceiveCompleteScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
