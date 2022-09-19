import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../../app/components/AppTemplate";
import { WormholeContext } from "../../../app/components/providers/WormholeProvider";
import SendCancelScreen from "../../../app/components/screens/send/SendCancelScreen";

export default {
  title: "screens/send/SendCancelScreen",
  component: SendCancelScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SendCancelScreen>;

const Template: ComponentStory<typeof SendCancelScreen> = (args) => (
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
        <SendCancelScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {};
