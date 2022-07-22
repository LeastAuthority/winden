import { Button } from "@mantine/core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../app/components/AppTemplate";
import { WormholeContext } from "../../app/components/providers/WormholeProvider";
import CompleteScreen from "../../app/components/screens/CompleteScreen";
import { useCommonStyles } from "../../app/hooks/useCommonStyles";

export default {
  title: "screens/CompleteScreen",
  component: CompleteScreen,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CompleteScreen>;

const Template: ComponentStory<typeof CompleteScreen> = (args) => (
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
        <CompleteScreen {...args} />
      </AppTemplate>
    </WormholeContext.Provider>
  </MemoryRouter>
);

export const Story = Template.bind({});
Story.args = {
  title: "Sent/Received!",
  render: () => {
    const { classes } = useCommonStyles();
    return <Button className={classes.secondary}>Send/Receive more</Button>;
  },
};
