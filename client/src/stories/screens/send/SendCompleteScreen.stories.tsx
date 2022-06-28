import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
import SendProgressScreen from "../../../app/components/screens/send/SendProgressScreen";

export default {
  title: "screens/send/SendProgressScreen",
  component: SendProgressScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SendProgressScreen>;

const Template: ComponentStory<typeof SendProgressScreen> = (args) => (
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
        <SendProgressScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
