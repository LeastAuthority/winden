import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
import SendCompleteScreen from "../../../app/components/screens/send/SendCompleteScreen";

export default {
  title: "screens/SendCompleteScreen",
  component: SendCompleteScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SendCompleteScreen>;

const Template: ComponentStory<typeof SendCompleteScreen> = (args) => (
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
        <SendCompleteScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
