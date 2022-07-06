import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppTemplate from "../../app/components/AppTemplate";
import { WormholeContext } from "../../app/components/providers/WormholeProvider";
import { ReceivePageContent } from "../../app/components/pages/ReceivePage";
import CodeInputProvider from "../../app/components/providers/CodeInputProvider";

export default {
  title: "pages/ReceivePage",
  component: ReceivePageContent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReceivePageContent>;

const Template: ComponentStory<typeof ReceivePageContent> = (args) => (
  <CodeInputProvider>
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
          <ReceivePageContent {...args} />
        </AppTemplate>
      </WormholeContext.Provider>
    </MemoryRouter>
  </CodeInputProvider>
);

export const Story = Template.bind({});
Story.args = {
  step: "BEGIN",
};
