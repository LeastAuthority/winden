import { Button } from "@mantine/core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { QuestionMark } from "tabler-icons-react";
import AppTemplate from "../../app/components/AppTemplate";
import { WormholeContext } from "../../app/components/providers/WormholeProvider";
import CancelScreen from "../../app/components/screens/CancelScreen";

export default {
  title: "screens/CancelScreen",
  component: CancelScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CancelScreen>;

const Template: ComponentStory<typeof CancelScreen> = (args) => (
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
        <CancelScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  render: () => {
    return (
      <Button leftIcon={<QuestionMark />} color="blue">
        Send/Receive a file
      </Button>
    );
  },
};
