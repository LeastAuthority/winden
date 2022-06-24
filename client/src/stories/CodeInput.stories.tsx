import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CodeInputContent } from "../app/components/CodeInput";

export default {
  title: "CodeInput",
  component: CodeInputContent,
} as ComponentMeta<typeof CodeInputContent>;

const Template: ComponentStory<typeof CodeInputContent> = (args) => (
  <CodeInputContent {...args} />
);

export const Blank = Template.bind({});
Blank.args = {
  code: "",
  codeSuggestion: "",
  focused: false,
  onChange: () => {
    console.log("onChange");
  },
  onFocus: () => {
    console.log("onFocus");
  },
  onBlur: () => {
    console.log("onBlur");
  },
  onSubmit: () => {
    console.log("onSubmit");
  },
};

export const Suggestion = Template.bind({});
Suggestion.args = {
  ...Blank.args,
  code: "7-gui",
  codeSuggestion: "guitarist",
  focused: true,
};

export const InvalidFormat = Template.bind({});
InvalidFormat.args = {
  ...Blank.args,
  code: "asdf",
};

export const InvalidFirstWord = Template.bind({});
InvalidFirstWord.args = {
  ...Blank.args,
  code: "7-gitarist-revenge",
};

export const InvalidSecondWord = Template.bind({});
InvalidSecondWord.args = {
  ...Blank.args,
  code: "7-guitarist-revege",
};
