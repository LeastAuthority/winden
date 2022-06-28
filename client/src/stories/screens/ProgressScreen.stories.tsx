import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../app/components/AppTemplate";
import { WormholeContext } from "../../app/components/providers/WormholeProvider";
import { ProgressScreenContent } from "../../app/components/screens/ProgressScreen";

export default {
  title: "screens/ProgressScreen",
  component: ProgressScreenContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ProgressScreenContent>;

const Template: ComponentStory<typeof ProgressScreenContent> = (args) => (
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
        <ProgressScreenContent {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Incomplete = Template.bind({});
Incomplete.args = {
  title: "Sending...",
  waitText: "Waiting for receiver to complete transfer...",
  bytesSent: 50,
  fileSize: 100,
  eta: 5,
  onCancel: () => console.log("onCancel"),
};

export const AlmostDone = Template.bind({});
AlmostDone.args = {
  ...Incomplete.args,
  bytesSent: 100,
  eta: 1,
};
